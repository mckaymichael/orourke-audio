/**
 * Mock data, used when VITE_USE_MOCK_DATA=true
 * Mirrors the shape of WordPress REST API responses (with ACF fields)
 */

// NOTE: This file's portfolio items were switched to real static media as a
// stopgap for the 2026-08-10 deadline, since the WordPress backend
// (Local by Flywheel) isn't reachable from production and the Hostinger
// migration is still in progress. Files live in `public/media/`. Titles,
// categories, and descriptions below are placeholders inferred from the
// filenames, edit them once there's time. See WORDPRESS_MIGRATION.md to
// finish the real backend migration and retire this fallback.

export const mockCategories = [
  { id: 1, name: 'Video', slug: 'video' },
  { id: 2, name: 'Audio', slug: 'audio' },
]

const TODAY = new Date().toISOString()

export const mockPortfolioItems = [
  {
    id: 1,
    date: TODAY,
    title: { rendered: 'Forever Winter' },
    excerpt: { rendered: '<p>[Placeholder description — edit before presenting.]</p>' },
    portfolio_category: [1],
    acf: {
      media_type: 'video',
      video_url: '/media/Forever-Winter.mp4',
      thumbnail: '/media/Forever-Winter.jpg',
      category: 'Video',
      featured: true,
    },
  },
  {
    id: 2,
    date: TODAY,
    title: { rendered: 'OTXO: Re-Composition' },
    excerpt: { rendered: '<p>Re-composition demo written over an existing scene from OTXO, for portfolio demonstration.</p>' },
    portfolio_category: [1],
    acf: {
      media_type: 'video',
      video_url: '/media/OTXO-Re-Composition.mp4',
      thumbnail: '/media/OTXO-Re-Composition.jpg',
      category: 'Video',
      featured: true,
    },
  },
  {
    id: 3,
    date: TODAY,
    title: { rendered: 'ILL: Soundtrack Redesign — Demo 1' },
    excerpt: { rendered: '<p>Soundtrack redesign demo. [Placeholder description — edit before presenting.]</p>' },
    portfolio_category: [2],
    acf: {
      media_type: 'audio',
      audio_url: '/media/ILL-SOUNDTRACK-REDESIGN-demo-1.mp3',
      thumbnail: '/media/ILL-SOUNDTRACK-REDESIGN-demo-1.jpg',
      category: 'Audio',
      featured: true,
    },
  },
  {
    id: 4,
    date: TODAY,
    title: { rendered: 'Setlist: Jump MF Jump — Demo Idea 2' },
    excerpt: { rendered: '<p>[Placeholder description — edit before presenting.]</p>' },
    portfolio_category: [2],
    acf: {
      media_type: 'audio',
      audio_url: '/media/Setlist-JUMP-MF-JUMP-demo-idea-2.mp3',
      thumbnail: '/media/Setlist-JUMP-MF-JUMP-demo-idea-2.jpg',
      category: 'Audio',
      featured: false,
    },
  },
  {
    id: 5,
    date: TODAY,
    title: { rendered: 'Setlist: Pause — Demo 1' },
    excerpt: { rendered: '<p>[Placeholder description — edit before presenting.]</p>' },
    portfolio_category: [2],
    acf: {
      media_type: 'audio',
      audio_url: '/media/setlist-PAUSE-demo-1.mp3',
      thumbnail: '/media/setlist-PAUSE-demo-1.jpg',
      category: 'Audio',
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
