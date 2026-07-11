import { useState } from 'react'
import styles from './ConceptRecordWall.module.css'
import { TRACKS, Cover } from './labMedia.jsx'

/**
 * CONCEPT 02 — "Record Wall"
 *
 * Browsing the catalogue like flipping through a crate of vinyl. A wall of
 * sleeves sits on the right; the selected sleeve's record spins on a
 * turntable on the left, doubling as the video "now playing" surface.
 */
export default function ConceptRecordWall() {
  const [active, setActive] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const track = TRACKS[active]

  function select(i) {
    setActive(i)
    setSpinning(true)
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.deck}>
        <div className={styles.turntable}>
          <div className={`${styles.platter} ${spinning ? styles.platterSpin : ''}`}>
            <Cover src={track.cover} seed={active} alt="" className={styles.disc} />
            <div className={styles.spindle} />
          </div>
          <div className={styles.tonearm} />
        </div>

        <div className={styles.nowPlaying}>
          <span className={styles.npTag}>Side A · Now playing</span>
          <h3 className={styles.npTitle}>{track.title}</h3>
          <p className={styles.npMeta}>{track.category} · {track.year}</p>
          <p className={styles.npMood}>{track.mood}</p>
          <div className={styles.transport}>
            <button
              className={styles.transportBtn}
              onClick={() => setSpinning((s) => !s)}
              aria-label={spinning ? 'Pause' : 'Play'}
            >
              {spinning ? '❚❚' : '►'}
            </button>
            <div className={styles.groove}>
              <span className={styles.grooveFill} style={{ width: spinning ? '62%' : '0%' }} />
            </div>
            <span className={styles.npTime}>{track.duration}</span>
          </div>
        </div>
      </div>

      <div className={styles.crate} role="list" aria-label="Soundtrack sleeves">
        {TRACKS.map((t, i) => (
          <button
            key={t.id}
            role="listitem"
            className={`${styles.sleeve} ${i === active ? styles.sleeveActive : ''}`}
            onClick={() => select(i)}
            aria-pressed={i === active}
          >
            <span className={styles.record} />
            <span className={styles.sleeveArt}>
              <Cover src={t.cover} seed={i} alt="" className={styles.sleeveImg} />
            </span>
            <span className={styles.sleeveInfo}>
              <span className={styles.sleeveTitle}>{t.title}</span>
              <span className={styles.sleeveCat}>{t.category}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
