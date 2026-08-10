import { useState, useEffect } from 'react'
import {
  getPortfolioItems,
  getPortfolioCategories,
  getPortfolioMedia,
  getMediaById,
} from '../api/wp.js'

/**
 * Returns all portfolio items + categories, with loading/error state.
 * Optionally filter by category slug.
 *
 * The item list itself is fully dynamic: every published "portfolio" post
 * comes back from getPortfolioItems() with no filtering or hand-picking, so
 * publishing a new item is all it takes for it to show up here.
 *
 * MEDIA RESOLUTION
 * Every item is returned with an extra `media` object so components never
 * have to guess where a playable file lives:
 *
 *   media = { type: 'video' | 'audio' | null, url: string | null, poster: string | null }
 *
 * The playable file comes from the ACF fields alone (media_type +
 * video_url / audio_url), full stop. There used to be a second fallback
 * that guessed the file from whatever WordPress happened to have attached
 * to the post, which sounds convenient but silently broke whenever a file
 * ended up attached to the wrong post, which WordPress does on its own more
 * often than you'd expect. Trusting the fields you actually fill in on the
 * "Add new Portfolio Item" screen is the simpler, predictable choice.
 *
 * If media_type/video_url/audio_url are left empty, the item just shows up
 * with no playable media rather than a guess. That's intentional.
 *
 * ACF QUIRK: with the field group's "Show in REST API" setting on, ACF's REST
 * output for a File field is the raw attachment ID (a number), not the URL,
 * no matter what the field's own Return Value setting says in wp-admin.
 * resolveAcfValue() below normalizes both shapes: a real URL string is used
 * as-is, a numeric ID is resolved to its file URL with one extra lookup.
 *
 * `poster` (the still image) is separate and uses WordPress's normal Featured
 * Image, see posterFor() below. That mechanism is standard and not part of the
 * fragile guessing this note is about, though it has a permission trap of its
 * own that posterFor() documents and works around.
 */

async function resolveAcfValue(value) {
  if (!value) return null
  if (typeof value === 'string' && value.trim()) {
    // Already a usable URL, or a root-relative path to a static file
    // (e.g. the /media/* fallback files used when VITE_USE_MOCK_DATA=true).
    if (/^https?:\/\//.test(value) || value.startsWith('/')) return value
  }
  const id = typeof value === 'number' ? value : parseInt(value, 10)
  if (!Number.isFinite(id)) return null
  try {
    const media = await getMediaById(id)
    return media?.source_url ?? null
  } catch {
    return null
  }
}

async function acfMedia(item) {
  const acf = item.acf ?? {}
  // acf comes back as an empty array when the field group isn't exposed to
  // REST (Field Group → Settings → Show in REST API), or when the fields
  // haven't been filled in on this item yet. Either way, no media to resolve.
  if (Array.isArray(acf)) return null

  const wantsVideo = acf.media_type === 'video' && acf.video_url
  const wantsAudio = acf.media_type === 'audio' && acf.audio_url
  // No explicit media_type, but a file is present anyway.
  const fallbackVideo = !wantsVideo && !wantsAudio && acf.video_url
  const fallbackAudio = !wantsVideo && !wantsAudio && !fallbackVideo && acf.audio_url

  if (wantsVideo || fallbackVideo) {
    const url = await resolveAcfValue(acf.video_url)
    if (url) return { type: 'video', url }
  }
  if (wantsAudio || fallbackAudio) {
    const url = await resolveAcfValue(acf.audio_url)
    if (url) return { type: 'audio', url }
  }
  return null
}

/**
 * Still image shown on the monitor. Matters most for audio-only pieces,
 * which have no video frame of their own to display.
 *
 * Order, first match wins:
 *   1. The ACF `thumbnail` field, when one is set (an explicit override)
 *   2. `featured_image_url`, if the site exposes it (see WHY, below)
 *   3. The item's WordPress featured image, read from the `_embed` payload
 *   4. The same featured image, fetched directly by its attachment ID
 *   5. Any image uploaded into the item
 *
 * WHY THERE ARE TWO ROUTES TO THE SAME FEATURED IMAGE
 * WordPress will not serve an attachment through the public REST API if that
 * attachment's parent post is trashed, a draft, or otherwise unpublished, and
 * an attachment's parent is simply whichever post it was first uploaded from.
 * So an image uploaded while drafting one piece, then reused as the featured
 * image on a different piece, comes back as `rest_forbidden` and `_embed`
 * silently hands back an error object instead of a URL. The monitor then falls
 * through to the gradient and nothing anywhere says why.
 *
 * Step 4 is the retry, and when it fails too the item is named in a console
 * warning with the one-line cure, so the cause is visible in seconds rather
 * than looking like a styling bug. Step 2 sidesteps the whole problem: if the
 * WordPress side exposes a `featured_image_url` field (see WORDPRESS_SETUP.md),
 * the URL is computed server side, where no attachment permission check
 * applies, and it is used before either REST route is attempted.
 *
 * Every source may be a URL string, an object, or a bare attachment ID
 * depending on how the field is configured in wp-admin, so all three shapes
 * are accepted and IDs are resolved to URLs.
 */
async function posterFor(item, getAttachments) {
  const acf = Array.isArray(item.acf) ? {} : (item.acf ?? {})

  // 1. Explicit ACF override, in any of the shapes ACF can return.
  const t = acf.thumbnail
  if (typeof t === 'string' && t) return t
  if (t && typeof t === 'object') {
    const fromObject = t.url ?? t.sizes?.large ?? t.source_url
    if (fromObject) return fromObject
  }
  if (typeof t === 'number' && t) {
    const url = await resolveAcfValue(t)
    if (url) return url
  }

  // 2. Server-computed URL, immune to attachment read permissions.
  if (typeof item.featured_image_url === 'string' && item.featured_image_url) {
    return item.featured_image_url
  }

  // 3 & 4. The featured image, via _embed and then by ID.
  const embedded = item._embedded?.['wp:featuredmedia']?.[0]
  if (embedded?.source_url) return embedded.source_url

  if (item.featured_media) {
    const url = await resolveAcfValue(item.featured_media)
    if (url) return url
    warnUnreadableFeaturedImage(item, embedded)
  }

  // 5. Last resort: any image uploaded into the item itself.
  const attachments = await getAttachments()
  const image = attachments.find(a => a.mimeType.startsWith('image/'))
  return image?.sourceUrl ?? null
}

/**
 * A featured image is set on the item but WordPress will not serve it to a
 * logged-out visitor. Almost always the attachment's parent post is trashed or
 * still a draft. Detaching the image in the Media Library fixes it for good.
 */
function warnUnreadableFeaturedImage(item, embedded) {
  const title = item.title?.rendered ?? `item ${item.id}`
  const reason = embedded?.code ? ` (${embedded.code})` : ''
  console.warn(
    `[portfolio] "${title}" has featured image #${item.featured_media}, but ` +
    `WordPress will not serve it publicly${reason}. This happens when the ` +
    `attachment's parent post is trashed or unpublished. Fix: Media Library → ` +
    `open the image → set "Uploaded to" to none, or re-upload it from this item.`
  )
}

export function usePortfolio(filterCategory = null) {
  const [items, setItems]           = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    Promise.all([getPortfolioItems(), getPortfolioCategories()])
      .then(async ([rawItems, rawCats]) => {
        if (cancelled) return
        setCategories(rawCats)

        const filtered = filterCategory
          ? rawItems.filter(item =>
              item.portfolio_category?.includes(
                rawCats.find(c => c.slug === filterCategory)?.id
              )
            )
          : rawItems

        // Attach resolved media to every item, in parallel. The item's own
        // attachments are only the last-resort source for the poster, so that
        // request is deferred behind getAttachments() and never fires for an
        // item that already has a featured image. A failed lookup degrades
        // gracefully rather than taking the page down.
        const withMedia = await Promise.all(
          filtered.map(async item => {
            const getAttachments = async () => {
              try {
                return await getPortfolioMedia(item.id)
              } catch {
                return []
              }
            }
            const resolved = (await acfMedia(item)) ?? { type: null, url: null }
            return {
              ...item,
              media: { ...resolved, poster: await posterFor(item, getAttachments) },
            }
          })
        )

        if (!cancelled) setItems(withMedia)
      })
      .catch(err => { if (!cancelled) setError(err) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [filterCategory])

  return { items, categories, loading, error }
}
