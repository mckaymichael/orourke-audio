import { useState } from 'react'
import { usePortfolio } from '../../hooks/usePortfolio.js'
import MixerConsole from '../../components/MixerConsole/MixerConsole.jsx'
import styles from './Portfolio.module.css'

/**
 * WORK PAGE
 *
 * Built on Concept 03 ("Mixer Console") from /lab/portfolio-concepts: a
 * mixing-desk split with the monitor on the left and the work as a rack of
 * channel strips on the right. Arming a channel loads that piece into the
 * monitor and plays it for real.
 *
 * Content comes from the WordPress "portfolio" custom post type. Each item's
 * playable file is resolved by the usePortfolio hook, which reads the ACF
 * media fields first and falls back to the item's own Media Library
 * attachments. Category tabs only render once portfolio_category terms exist,
 * so the page stays clean while the taxonomy is still empty.
 *
 * The page carries no heading or intro copy. The console is the first thing
 * on screen, and the work speaks before any framing does.
 */
export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState(null)
  const { items, categories, loading, error } = usePortfolio(activeCategory)

  return (
    <div className={styles.page}>
      <div className="container">

        {categories.length > 0 && (
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
        )}

        {loading && <p className={styles.state}>Loading the desk…</p>}
        {error && (
          <p className={styles.state}>
            The work could not be loaded right now. Please try again.
          </p>
        )}
        {!loading && !error && items.length === 0 && (
          <p className={styles.state}>No pieces in this category yet.</p>
        )}

        {!loading && !error && items.length > 0 && (
          <MixerConsole items={items} />
        )}

      </div>
    </div>
  )
}
