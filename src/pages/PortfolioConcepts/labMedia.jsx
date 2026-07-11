/**
 * SHARED MEDIA + DATA for the /lab/portfolio-concepts exploration page.
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * All ten concept layouts pull their imagery and track/video data from here so
 * that (a) the concepts stay comparable — same content, different composition —
 * and (b) every external image URL lives in ONE place and can be swapped in one
 * edit if a photo ID ever goes stale.
 *
 * IMAGES: cover art is pulled from Unsplash's CDN (images.unsplash.com). These
 * were chosen for a cinematic / game-world mood. If any ever fail to load, the
 * <Cover> component below falls back to an inline brand-coloured SVG, so a
 * broken-image icon can never appear on the page. To replace one, just paste a
 * new Unsplash URL into COVERS.
 *
 * MEDIA PLAYERS: there are no real audio/video files wired up here — these are
 * layout studies. "Players" are simulated in each concept (visual play states,
 * animated waveforms/meters). The one real asset used is the local
 * video-thumbnail.jpg as a poster image.
 */

import { useState } from 'react'

/* ── Unsplash cover art (swap URLs here if any go stale) ─────────────── */
const u = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`

export const COVERS = {
  neonCity:   u('photo-1518709268805-4e9042af9f23'), // molten red abstract
  arcade:     u('photo-1511512578047-dfb367046420'), // arcade / controller glow
  studio:     u('photo-1493225457124-a3eb161ffa5f'), // mixing desk
  headphones: u('photo-1470225620780-dba8ba36b745'), // headphones on desk
  forest:     u('photo-1441974231531-c6227db76b6e'), // sunlit forest
  fog:        u('photo-1470071459604-3b5ec3a7fe05'), // foggy mountains
  space:      u('photo-1451187580459-43490279c0fa'), // earth from space
  nebula:     u('photo-1534796636912-3b95b3ab5986'), // nebula
  concert:    u('photo-1516450360452-9312f5e86fc7'), // concert lights
  desert:     u('photo-1509316785289-025f5b846b35'), // desert dunes
  rain:       u('photo-1428592953211-077101b2021b'), // rainy neon street
  synth:      u('photo-1461784121038-f088ca1e7714'), // synth keys
}

/* ── Brand-coloured inline SVG fallback (never a broken image) ───────── */
export function fallbackDataUri(seed = 0) {
  const hues = [
    ['#E8181F', '#121010'],
    ['#E8676C', '#1e1516'],
    ['#c01419', '#261518'],
    ['#8f0f14', '#121010'],
  ]
  const [a, b] = hues[seed % hues.length]
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/>
    </linearGradient></defs>
    <rect width='600' height='600' fill='url(%23g)'/>
    <g fill='none' stroke='%23F7F0F1' stroke-opacity='0.18' stroke-width='3'>
      ${Array.from({ length: 7 }, (_, i) => {
        const y = 120 + i * 55
        return `<path d='M0 ${y} Q 150 ${y - 40} 300 ${y} T 600 ${y}'/>`
      }).join('')}
    </g>
  </svg>`
  return `data:image/svg+xml;utf8,${svg.replace(/\n/g, '').replace(/#/g, '%23')}`
}

/* ── Soundtracks (compact-list content) ─────────────────────────────── */
export const TRACKS = [
  { id: 't1', title: 'Rooftops and Alleys', category: 'Main Theme',   year: 2025, duration: '3:42', cover: COVERS.rain,       mood: 'Tense · Cinematic' },
  { id: 't2', title: 'Ember Vigil',          category: 'Ambient Loop', year: 2025, duration: '2:18', cover: COVERS.neonCity,   mood: 'Warm · Brooding' },
  { id: 't3', title: 'Coldwater Signal',     category: 'Cinematic Cue', year: 2024, duration: '1:57', cover: COVERS.fog,        mood: 'Sparse · Uneasy' },
  { id: 't4', title: 'Understory',           category: 'Exploration',  year: 2025, duration: '4:05', cover: COVERS.forest,     mood: 'Open · Curious' },
  { id: 't5', title: 'Orbital Drift',        category: 'Ambient Loop', year: 2024, duration: '5:11', cover: COVERS.space,      mood: 'Vast · Weightless' },
  { id: 't6', title: 'Neon Confession',      category: 'Main Theme',   year: 2025, duration: '3:03', cover: COVERS.arcade,     mood: 'Pulsing · Bold' },
  { id: 't7', title: 'Dune Requiem',         category: 'Cinematic Cue', year: 2024, duration: '2:44', cover: COVERS.desert,    mood: 'Grand · Mournful' },
  { id: 't8', title: 'Last Transmission',    category: 'Boss Theme',   year: 2025, duration: '3:29', cover: COVERS.nebula,     mood: 'Driving · Epic' },
]

/* ── Video works (feature-reel content) ─────────────────────────────── */
export const VIDEOS = [
  { id: 'v1', title: 'Rooftops and Alleys', scene: 'Trailer Composition', duration: '1:12', cover: COVERS.rain },
  { id: 'v2', title: 'The Long Understory',  scene: 'Vertical Slice',      duration: '2:40', cover: COVERS.forest },
  { id: 'v3', title: 'Orbital Drift',        scene: 'Cinematic Intro',     duration: '0:58', cover: COVERS.space },
  { id: 'v4', title: 'Neon Confession',      scene: 'Boss Reveal',         duration: '1:34', cover: COVERS.arcade },
]

/* ── <Cover> — an <img> that can never show a broken-image icon ─────── */
export function Cover({ src, alt = '', seed = 0, className, style }) {
  const [failed, setFailed] = useState(false)
  return (
    <img
      src={failed ? fallbackDataUri(seed) : src}
      alt={alt}
      loading="lazy"
      className={className}
      style={style}
      onError={() => setFailed(true)}
    />
  )
}
