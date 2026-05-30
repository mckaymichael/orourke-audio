/**
 * Mock data — used when VITE_USE_MOCK_DATA=true
 * Mirrors the shape of WordPress REST API responses (with ACF fields)
 */

export const mockCategories = [
  { id: 1, name: 'Sound Design',       slug: 'sound-design' },
  { id: 2, name: 'Foley & SFX',        slug: 'foley-sfx' },
  { id: 3, name: 'Original Score',     slug: 'original-score' },
  { id: 4, name: 'Audio Editing & Mix',slug: 'audio-editing-mix' },
]

export const mockPortfolioItems = [
  {
    id: 1,
    title: { rendered: 'Coastal Drift — Short Film' },
    excerpt: { rendered: '<p>Complete sound design for a 12-minute drama set along the BC coastline. Foley, ambience, and tension-building SFX from scratch.</p>' },
    portfolio_category: [1],
    acf: {
      audio_url: '',
      category: 'Sound Design',
      year: 2024,
      featured: true,
    },
  },
  {
    id: 2,
    title: { rendered: 'Harbour Foley Pack' },
    excerpt: { rendered: '<p>Original foley recording session — footsteps on wood, rope, water, and marine hardware. Delivered as a sorted, broadcast-ready SFX library.</p>' },
    portfolio_category: [2],
    acf: {
      audio_url: '',
      category: 'Foley & SFX',
      year: 2024,
      featured: true,
    },
  },
  {
    id: 3,
    title: { rendered: 'Undercurrent — Original Score' },
    excerpt: { rendered: '<p>Original score for a 20-minute thriller short. Atmospheric strings, textured percussion, and electronic layers — delivered as stems for editorial flexibility.</p>' },
    portfolio_category: [3],
    acf: {
      audio_url: '',
      category: 'Original Score',
      year: 2023,
      featured: true,
    },
  },
  {
    id: 4,
    title: { rendered: 'Broadcast Mix — Documentary Pilot' },
    excerpt: { rendered: '<p>Dialogue cleanup, music mixing, and final broadcast-spec deliverable for a 30-minute documentary pilot. Netflix loudness standards met.</p>' },
    portfolio_category: [4],
    acf: {
      audio_url: '',
      category: 'Audio Editing & Mix',
      year: 2023,
      featured: false,
    },
  },
  {
    id: 5,
    title: { rendered: 'Neon Static — Trailer Sound Design' },
    excerpt: { rendered: '<p>High-impact sound design for a 90-second genre thriller trailer. Custom impacts, risers, and a fully designed soundscape built to complement the temp score.</p>' },
    portfolio_category: [1],
    acf: {
      audio_url: '',
      category: 'Sound Design',
      year: 2024,
      featured: false,
    },
  },
  {
    id: 6,
    title: { rendered: 'Quiet Hours — Ambient Score' },
    excerpt: { rendered: '<p>Minimalist ambient score for a meditation app — 6 tracks, each built from field recordings layered with synthesized textures. Delivered as seamlessly looping stems.</p>' },
    portfolio_category: [3],
    acf: {
      audio_url: '',
      category: 'Original Score',
      year: 2023,
      featured: false,
    },
  },
]

export const mockServices = [
  {
    id: 1,
    title: { rendered: 'Sound Design' },
    acf: {
      tagline: 'Complete sonic worlds built from scratch',
      starting_price: '$800',
      features: 'Atmosphere & ambience\nTransitions & impacts\nCustom SFX library\nDelivered as stems',
      cta_label: 'Inquire',
    },
  },
  {
    id: 2,
    title: { rendered: 'Foley & SFX' },
    acf: {
      tagline: 'Original and library sound effects, tailored to picture',
      starting_price: '$600',
      features: 'Footsteps, cloth & props\nEnvironment & spot effects\nEdited to cut\nBroadcast-ready deliverables',
      cta_label: 'Inquire',
    },
  },
  {
    id: 3,
    title: { rendered: 'Original Score' },
    acf: {
      tagline: 'Full music production in any genre, delivered as stems',
      starting_price: '$1,200',
      features: 'Temp-track replacement\nStem delivery for re-edit flexibility\nDolby-compliant masters\nUnlimited revisions within scope',
      cta_label: 'Inquire',
    },
  },
  {
    id: 4,
    title: { rendered: 'Audio Editing & Mix' },
    acf: {
      tagline: 'Dialogue cleanup, ADR support, and broadcast deliverables',
      starting_price: '$500',
      features: 'Dialogue cleanup & noise reduction\nADR support\nMusic mixing\nStreaming & broadcast spec output',
      cta_label: 'Inquire',
    },
  },
]
