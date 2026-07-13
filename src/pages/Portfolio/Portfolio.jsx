import { useState } from 'react'
import { usePortfolio } from '../../hooks/usePortfolio.js'
import FeaturedFilm from '../../components/FeaturedFilm/FeaturedFilm.jsx'
import RecordWall from '../../components/RecordWall/RecordWall.jsx'
import styles from './Portfolio.module.css'

/**
 * PORTFOLIO PAGE
 *
 * - Fetches items and categories from WordPress REST API
 * - Category filter tabs at the top
 * - Portfolio pieces are presented as a "Record Wall": a turntable/video
 *   deck for the selected piece beside a crate of sleeves (see RecordWall
 *   component, adapted from Concept 02 at /lab/portfolio-concepts)
 *
 * WordPress custom post type required: "portfolio"
 * WordPress custom taxonomy required: "portfolio_category"
 * ACF fields per item: audio_url, video_url, media_type, description, category, year
 *
 * media_type is "audio" or "video". When "video", video_url (a self-hosted
 * MP4 in the WordPress Media Library) is rendered instead of the audio player.
 */
export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState(null)
  const { items, categories, loading, error } = usePortfolio(activeCategory)

  return (
    <div className={styles.page}>
      <div className="container">
        <FeaturedFilm />

        {/* Category filter */}
        <div className={styles.filters} role="tablist" aria-label="Filter by category">
          <button
            className={`${styles.filterBtn} ${activeCategory === null ? styles.filterActive : ''}`}
            onClick={() => setActiveCategory(null)}
            role="tab"
            aria-selected={activeCategory === null}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`${styles.filterBtn} ${activeCategory === cat.slug ? styles.filterActive : ''}`}
              onClick={() => setActiveCategory(cat.slug)}
              role="tab"
              aria-selected={activeCategory === cat.slug}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* States */}
        {loading && <p className={styles.state}>Loading portfolio…</p>}
        {error   && <p className={styles.state}>Failed to load portfolio. Please try again.</p>}
        {!loading && !error && items.length === 0 && (
          <p className={styles.state}>No items in this category yet.</p>
        )}

        {/* Portfolio pieces, Record Wall layout */}
        {!loading && !error && items.length > 0 && (
          <RecordWall items={items} />
        )}
      </div>
    </div>
  )
}
