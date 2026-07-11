import { useState } from 'react'
import styles from './ConceptPosterPlaylist.module.css'
import { TRACKS, Cover } from './labMedia.jsx'

/**
 * CONCEPT 04 — "Poster → Playlist"
 *
 * The "portfolios get more compact as you scroll" instinct, turned into a
 * control the visitor holds. One content set, two densities: CINEMA (big
 * poster cards, each with a video affordance) and SETLIST (a tight numbered
 * tracklist). A single toggle morphs between them.
 */
export default function ConceptPosterPlaylist() {
  const [mode, setMode] = useState('cinema') // 'cinema' | 'setlist'

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <span className={styles.count}>{TRACKS.length} works</span>
        <div className={styles.toggle} role="tablist" aria-label="Density">
          <button
            role="tab"
            aria-selected={mode === 'cinema'}
            className={`${styles.toggleBtn} ${mode === 'cinema' ? styles.toggleOn : ''}`}
            onClick={() => setMode('cinema')}
          >
            ▦ Cinema
          </button>
          <button
            role="tab"
            aria-selected={mode === 'setlist'}
            className={`${styles.toggleBtn} ${mode === 'setlist' ? styles.toggleOn : ''}`}
            onClick={() => setMode('setlist')}
          >
            ≡ Setlist
          </button>
        </div>
      </div>

      {mode === 'cinema' ? (
        <div className={styles.cinema}>
          {TRACKS.map((t, i) => (
            <article key={t.id} className={styles.poster}>
              <div className={styles.posterArt}>
                <Cover src={t.cover} seed={i} alt="" className={styles.posterImg} />
                <span className={styles.posterPlay}><span className={styles.tri} /></span>
                <span className={styles.posterCat}>{t.category}</span>
              </div>
              <div className={styles.posterBody}>
                <h3 className={styles.posterTitle}>{t.title}</h3>
                <p className={styles.posterMeta}>{t.mood}</p>
                <span className={styles.posterTime}>{t.duration} · {t.year}</span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <ol className={styles.setlist}>
          {TRACKS.map((t, i) => (
            <li key={t.id} className={styles.row}>
              <span className={styles.rowNum}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.rowThumb}>
                <Cover src={t.cover} seed={i} alt="" className={styles.rowImg} />
                <span className={styles.rowPlay} />
              </span>
              <span className={styles.rowTitle}>{t.title}</span>
              <span className={styles.rowCat}>{t.category}</span>
              <span className={styles.rowMood}>{t.mood}</span>
              <span className={styles.rowTime}>{t.duration}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
