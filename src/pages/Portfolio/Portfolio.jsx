import { useState } from 'react'
import { usePortfolio } from '../../hooks/usePortfolio.js'
import FeaturedAlbum from '../../components/FeaturedAlbum/FeaturedAlbum.jsx'
import FeaturedFilm from '../../components/FeaturedFilm/FeaturedFilm.jsx'
import styles from './Portfolio.module.css'

/**
 * PORTFOLIO PAGE
 *
 * - Fetches items and categories from WordPress REST API
 * - Category filter tabs at the top
 * - Grid of audio cards with inline <audio> players
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
        <header className={styles.header}>
          <p className="section-label">Work</p>
          <h1 className="section-title">Portfolio</h1>
          <p className="section-body">
            Original game soundtracks, main themes, ambient loops, and interactive cues, organized by type.
          </p>
        </header>

        <FeaturedAlbum />
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

        {/* Portfolio grid */}
        {!loading && !error && (
          <div className={styles.grid}>
            {items.length === 0 && (
              <p className={styles.state}>No items in this category yet.</p>
            )}
            {items.map(item => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function PortfolioCard({ item }) {
  const acf     = item.acf ?? {}
  const title   = item.title?.rendered ?? 'Untitled'
  const desc    = item.excerpt?.rendered ?? acf.description ?? ''
  const isVideo = acf.media_type === 'video' && Boolean(acf.video_url)

  return (
    <article className={`card ${styles.card}`}>
      {isVideo && (
        <div className={styles.videoWrap}>
          <span className={styles.mediaBadge}>Video</span>
          <video
            controls
            preload="metadata"
            className={styles.video}
            aria-label={`Video player for ${title}`}
          >
            <source src={acf.video_url} type="video/mp4" />
          </video>
        </div>
      )}
      {!isVideo && acf.audio_url && (
        <div className={styles.audioWrap}>
          <span className={styles.mediaBadge}>Audio</span>
          <audio
            controls
            preload="metadata"
            className={styles.audio}
            aria-label={`Audio player for ${title}`}
          >
            <source src={acf.audio_url} type="audio/mpeg" />
          </audio>
        </div>
      )}
      <div className={styles.cardBody}>
        {acf.category && (
          <span className={`font-mono ${styles.cat}`}>{acf.category}</span>
        )}
        <h2 className={styles.cardTitle}>{title}</h2>
        {desc && (
          <div
            className={styles.cardDesc}
            dangerouslySetInnerHTML={{ __html: desc }}
          />
        )}
        {acf.year && <span className={styles.year}>{acf.year}</span>}
      </div>
    </article>
  )
}
