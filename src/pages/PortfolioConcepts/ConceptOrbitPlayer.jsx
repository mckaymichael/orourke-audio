import { useState } from 'react'
import styles from './ConceptOrbitPlayer.module.css'
import { TRACKS, Cover } from './labMedia.jsx'

/**
 * CONCEPT 05 — "Orbit Player"
 *
 * A spatial alternative to a vertical list. The feature video is a disc at
 * the centre; soundtracks orbit it as satellites on two rings. Selecting a
 * satellite docks it into the core and reveals its detail — the catalogue
 * becomes a little solar system.
 */
export default function ConceptOrbitPlayer() {
  const [active, setActive] = useState(0)
  const track = TRACKS[active]

  // Split tracks across an inner and outer ring, spread evenly by angle.
  const rings = [
    { r: 33, items: TRACKS.slice(0, 4) },
    { r: 46, items: TRACKS.slice(4) },
  ]

  return (
    <div className={styles.wrap}>
      <div className={styles.system}>
        <div className={`${styles.ring} ${styles.ringInner}`} aria-hidden="true" />
        <div className={`${styles.ring} ${styles.ringOuter}`} aria-hidden="true" />

        {/* Core / video disc */}
        <div className={styles.core}>
          <Cover src={track.cover} seed={active} alt="" className={styles.coreImg} />
          <div className={styles.coreVeil} />
          <button className={styles.corePlay} aria-label={`Play ${track.title}`}>
            <span className={styles.tri} />
          </button>
          <span className={styles.coreLabel}>Feature Reel</span>
        </div>

        {/* Satellites */}
        {rings.map((ring, ri) =>
          ring.items.map((t, idx) => {
            const globalIndex = ri === 0 ? idx : idx + 4
            const count = ring.items.length
            const angle = (idx / count) * Math.PI * 2 - Math.PI / 2
            const left = 50 + Math.cos(angle) * ring.r
            const top = 50 + Math.sin(angle) * ring.r
            const on = globalIndex === active
            return (
              <button
                key={t.id}
                className={`${styles.sat} ${on ? styles.satOn : ''}`}
                style={{ left: `${left}%`, top: `${top}%` }}
                onClick={() => setActive(globalIndex)}
                aria-pressed={on}
                aria-label={`Select ${t.title}`}
              >
                <Cover src={t.cover} seed={globalIndex} alt="" className={styles.satImg} />
                <span className={styles.satTip}>{t.title}</span>
              </button>
            )
          }),
        )}
      </div>

      {/* Detail dock */}
      <aside className={styles.dock}>
        <span className={styles.dockTag}>Docked · {String(active + 1).padStart(2, '0')} / {TRACKS.length}</span>
        <h3 className={styles.dockTitle}>{track.title}</h3>
        <p className={styles.dockCat}>{track.category}</p>
        <p className={styles.dockMood}>{track.mood}</p>
        <div className={styles.dockMeta}>
          <span>{track.duration}</span>
          <span>{track.year}</span>
        </div>
        <div className={styles.dockNav}>
          <button onClick={() => setActive((a) => (a - 1 + TRACKS.length) % TRACKS.length)} aria-label="Previous">‹</button>
          <button onClick={() => setActive((a) => (a + 1) % TRACKS.length)} aria-label="Next">›</button>
        </div>
      </aside>
    </div>
  )
}
