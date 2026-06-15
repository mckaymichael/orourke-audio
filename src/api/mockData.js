/**
 * Mock data — used when VITE_USE_MOCK_DATA=true
 * Mirrors the shape of WordPress REST API responses (with ACF fields)
 */

export const mockCategories = [
  { id: 1, name: 'Original Soundtrack', slug: 'original-soundtrack' },
  { id: 2, name: 'Main Theme',          slug: 'main-theme' },
  { id: 3, name: 'Ambient & Loops',     slug: 'ambient-loops' },
  { id: 4, name: 'Cinematic',           slug: 'cinematic' },
]

export const mockPortfolioItems = [
  {
    id: 1,
    title: { rendered: 'Ironveil — Full OST' },
    excerpt: { rendered: '<p>Original soundtrack for a 2D action-RPG. 14 tracks spanning combat, exploration, and cutscene cues — delivered as stems for adaptive implementation.</p>' },
    portfolio_category: [1],
    acf: {
      audio_url: '',
      category: 'Original Soundtrack',
      year: 2024,
      featured: true,
    },
  },
  {
    id: 2,
    title: { rendered: 'Depths of Nora — Main Theme' },
    excerpt: { rendered: '<p>Main theme for a narrative exploration game. A single melodic motif developed through three variations: title screen, mid-game, and finale.</p>' },
    portfolio_category: [2],
    acf: {
      audio_url: '',
      category: 'Main Theme',
      year: 2024,
      featured: true,
    },
  },
  {
    id: 3,
    title: { rendered: 'Verdant — Ambient Loop Pack' },
    excerpt: { rendered: '<p>Eight seamlessly looping ambient tracks for a cozy farming sim. Each loop was built around the visual palette of its biome — forest, coast, desert, and winter.</p>' },
    portfolio_category: [3],
    acf: {
      audio_url: '',
      category: 'Ambient & Loops',
      year: 2024,
      featured: true,
    },
  },
  {
    id: 4,
    title: { rendered: 'Signal Lost — Cinematic Trailer' },
    excerpt: { rendered: '<p>Cinematic score for a sci-fi game trailer. Built around a tension arc from silence to full orchestral swell — synced to picture, delivered as a single mixed master.</p>' },
    portfolio_category: [4],
    acf: {
      audio_url: '',
      category: 'Cinematic',
      year: 2023,
      featured: false,
    },
  },
  {
    id: 5,
    title: { rendered: 'Hollow Keep — Combat Suite' },
    excerpt: { rendered: '<p>Combat music suite for a gothic dungeon crawler. Three intensity layers designed for adaptive layering — loop-ready, stem-separated, engine-agnostic.</p>' },
    portfolio_category: [1],
    acf: {
      audio_url: '',
      category: 'Original Soundtrack',
      year: 2024,
      featured: false,
    },
  },
  {
    id: 6,
    title: { rendered: 'Luma — UI & Menu Music' },
    excerpt: { rendered: '<p>Menu music and UI stings for a mobile puzzle game. Upbeat, minimal, and non-fatiguing across extended sessions — delivered as looping stems.</p>' },
    portfolio_category: [3],
    acf: {
      audio_url: '',
      category: 'Ambient & Loops',
      year: 2023,
      featured: false,
    },
  },
]

export const mockServices = [
  {
    id: 1,
    title: { rendered: 'Original Soundtrack' },
    acf: {
      tagline: 'A full score written for your game, start to finish',
      starting_price: '$1,200',
      features: 'Original composition in any genre\nStem delivery for adaptive implementation\nLoop-ready formatting\nUnlimited revisions within scope',
      cta_label: 'Inquire',
    },
  },
  {
    id: 2,
    title: { rendered: 'Main Theme & Key Cues' },
    acf: {
      tagline: 'The musical identity your game leads with',
      starting_price: '$600',
      features: 'Main theme with motif development\nTitle screen, victory, and game-over variants\nMixed and mastered master files\nStem delivery on request',
      cta_label: 'Inquire',
    },
  },
  {
    id: 3,
    title: { rendered: 'Ambient & Loop Packs' },
    acf: {
      tagline: 'Seamless background music for every zone and mood',
      starting_price: '$400',
      features: 'Seamlessly looping tracks\nBiome or mood-matched sets\nMultiple intensity layers\nEngine-agnostic file formats',
      cta_label: 'Inquire',
    },
  },
  {
    id: 4,
    title: { rendered: 'Cinematic & Trailer Score' },
    acf: {
      tagline: 'Music that sells the moment before the game ships',
      starting_price: '$800',
      features: 'Synced to picture\nOrchestral, electronic, or hybrid\nFull mixed master + stems\nRevision rounds included',
      cta_label: 'Inquire',
    },
  },
]
