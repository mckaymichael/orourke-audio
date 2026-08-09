/**
 * WordPress REST API client
 *
 * Base URL is read from VITE_WP_API_URL env variable.
 * During local dev, Vite proxies /wp-json → http://orourke-audio.local
 * so you can also just use the relative path below.
 *
 * Set VITE_USE_MOCK_DATA=true to bypass WordPress entirely (e.g. Vercel deploy).
 */

import {
  mockPortfolioItems,
  mockCategories,
  mockServices,
} from './mockData.js'

const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true'
const BASE = import.meta.env.VITE_WP_API_URL ?? '/wp-json'

async function request(path) {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) throw new Error(`WP API error: ${res.status} ${path}`)
  return res.json()
}

// ─── Portfolio ────────────────────────────────────────────────────────────────

/**
 * Fetch all portfolio items (custom post type: "portfolio").
 * Each item includes ACF fields: category, audio_url, description, featured_image.
 */
export async function getPortfolioItems() {
  if (USE_MOCK) return mockPortfolioItems
  return request('/wp/v2/portfolio?per_page=100&_embed')
}

/**
 * Fetch a single portfolio item by slug.
 */
export async function getPortfolioItem(slug) {
  if (USE_MOCK) return mockPortfolioItems.find(i => i.slug === slug) ?? null
  const items = await request(`/wp/v2/portfolio?slug=${slug}&_embed`)
  return items[0] ?? null
}

/**
 * Fetch all portfolio categories (custom taxonomy: "portfolio_category").
 */
export async function getPortfolioCategories() {
  if (USE_MOCK) return mockCategories
  return request('/wp/v2/portfolio_category?per_page=100')
}

/**
 * Fetch the Media Library attachments belonging to a single portfolio item.
 *
 * WHY THIS EXISTS
 * When an MP3 or MP4 is uploaded from inside a portfolio post, WordPress
 * records that post as the attachment's parent. That makes the attachment a
 * reliable source of playable media even before the ACF audio_url / video_url
 * fields are filled in. resolveItemMedia() below prefers ACF when it is
 * present and falls back to these attachments when it is not.
 *
 * Returns a trimmed list: [{ id, title, sourceUrl, mimeType }].
 */
export async function getPortfolioMedia(parentId) {
  if (USE_MOCK) return []
  const fields = 'id,title,source_url,mime_type'
  const raw = await request(
    `/wp/v2/media?parent=${parentId}&per_page=100&_fields=${fields}`
  )
  return raw.map(m => ({
    id:        m.id,
    title:     m.title?.rendered ?? '',
    sourceUrl: m.source_url,
    mimeType:  m.mime_type ?? '',
  }))
}

/**
 * Fetch a single Media Library attachment by ID.
 *
 * WHY THIS EXISTS
 * ACF's "Show in REST API" toggle exposes File fields as the raw attachment
 * ID (a number) rather than the resolved URL, regardless of the field's own
 * Return Value setting in wp-admin. resolveAcfUrl() in usePortfolio.js uses
 * this to turn that ID into an actual playable file URL.
 */
export async function getMediaById(id) {
  if (USE_MOCK) return null
  const fields = 'id,source_url,mime_type'
  return request(`/wp/v2/media/${id}?_fields=${fields}`)
}

// ─── Services ─────────────────────────────────────────────────────────────────

/**
 * Fetch all service items (custom post type: "service").
 * ACF fields: tagline, features (array), starting_price, cta_label.
 */
export async function getServices() {
  if (USE_MOCK) return mockServices
  return request('/wp/v2/service?per_page=100&_embed&orderby=menu_order&order=asc')
}

// ─── Site Info (About content) ────────────────────────────────────────────────

/**
 * Fetch a WordPress page by slug (e.g. "about").
 * Used for the About section content managed in WP.
 */
export async function getPage(slug) {
  if (USE_MOCK) return null
  const pages = await request(`/wp/v2/pages?slug=${slug}&_embed`)
  return pages[0] ?? null
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

/**
 * Submit a contact form via Contact Form 7 REST API.
 * Requires the CF7 plugin installed and the form ID set below.
 *
 * @param {Object} data - { name, email, message }
 */
export async function submitContactForm(data) {
  const CF7_FORM_ID = import.meta.env.VITE_CF7_FORM_ID ?? '1'
  const body = new FormData()
  body.append('your-name',    data.name)
  body.append('your-email',   data.email)
  body.append('your-message', data.message)

  const res = await fetch(
    `${BASE}/contact-form-7/v1/contact-forms/${CF7_FORM_ID}/feedback`,
    { method: 'POST', body }
  )
  return res.json()
}
