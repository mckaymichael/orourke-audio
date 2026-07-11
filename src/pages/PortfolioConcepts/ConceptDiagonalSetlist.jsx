import { useState } from 'react'
import styles from './ConceptDiagonalSetlist.module.css'
import { TRACKS, Cover } from './labMedia.jsx'

/**
 * CONCEPT 08 — "Diagonal Setlist"
 *
 * A hard diagonal split. The feature video fills the upper triangle; a
 * numbered setlist ledger fills the lower one. Hovering or selecting a
 * setlist row re-cues the video side and cross-highlights, tying the reel
 * and the tracklist into one composition.
 */
export default function ConceptDiagonalSetlist() {
  const [active, setActive] = useState(0)
  const track = TRACKS[active]

  return (
    <div className={styles.wrap}>
      <div className={styles.split}>
        {/* Video (upper triangle) */}
        <div className={styles.screen}>
          <Cover src={track.cover} seed={active} alt="" className={styles.screenImg} />
          <div className={styles.screenVeil} />
          <div className={styles.screenMeta}>
            <span className={styles.screenTag}>Reel · {String(active + 1).padStart(2, '0')}</span>
            <h3 className={styles.screenTitle}>{track.title}</h3>
            <p className={styles.screenSub}>{track.category} · {track.duration}</p>
          </div>
          <button className={styles.screenPlay} aria-label={`Play ${track.title}`}>
            <span className={styles.tri} />
          </button>
        </div>

        {/* Setlist (lower triangle) */}
        <div className={styles.ledger}>
          <span className={styles.ledgerHead}>Setlist</span>
          <ul className={styles.rows}>
            {TRACKS.map((t, i) => (
              <li key={t.id}>
                <button
                  className={`${styles.row} ${i === active ? styles.rowActive : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                >
                  <span className={styles.rowNum}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.rowTitle}>{t.title}</span>
                  <span className={styles.rowMood}>{t.mood}</span>
                  <span className={styles.rowTime}>{t.duration}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
