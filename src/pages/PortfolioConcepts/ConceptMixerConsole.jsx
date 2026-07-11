import { useState } from 'react'
import styles from './ConceptMixerConsole.module.css'
import { TRACKS, Cover } from './labMedia.jsx'

/**
 * CONCEPT 03 — "Mixer Console"
 *
 * A DAW / mixing-desk metaphor. The video monitor lives on the left; the
 * soundtrack list becomes a rack of channel strips on the right, each with a
 * fader and a live level meter. Arming a channel routes it to the monitor.
 */
export default function ConceptMixerConsole() {
  const [active, setActive] = useState(0)
  const track = TRACKS[active]

  return (
    <div className={styles.wrap}>
      {/* ── Monitor ─────────────────────────────────────────── */}
      <div className={styles.monitor}>
        <div className={styles.monitorScreen}>
          <Cover src={track.cover} seed={active} alt="" className={styles.monitorImg} />
          <div className={styles.scanlines} aria-hidden="true" />
          <span className={styles.recDot}>● ARMED</span>
          <div className={styles.monitorMeta}>
            <h3 className={styles.monitorTitle}>{track.title}</h3>
            <p className={styles.monitorSub}>{track.category} · {track.duration}</p>
          </div>
        </div>
        <div className={styles.busRow}>
          <span className={styles.busLabel}>MASTER OUT</span>
          <div className={styles.busMeter}>
            {Array.from({ length: 14 }, (_, i) => (
              <span key={i} className={styles.busSeg} style={{ animationDelay: `${i * 60}ms` }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Channel rack ────────────────────────────────────── */}
      <div className={styles.rack} role="list" aria-label="Soundtrack channels">
        <div className={styles.rackHead}>
          <span>CH</span><span>Track</span><span>Level</span>
        </div>
        {TRACKS.map((t, i) => {
          const on = i === active
          return (
            <button
              key={t.id}
              role="listitem"
              className={`${styles.channel} ${on ? styles.channelOn : ''}`}
              onClick={() => setActive(i)}
              aria-pressed={on}
            >
              <span className={styles.chNum}>{String(i + 1).padStart(2, '0')}</span>

              <span className={styles.chInfo}>
                <span className={styles.chTitle}>{t.title}</span>
                <span className={styles.chCat}>{t.category} · {t.mood}</span>
              </span>

              <span className={styles.chMeter} aria-hidden="true">
                {Array.from({ length: 8 }, (_, s) => (
                  <span
                    key={s}
                    className={`${styles.seg} ${on ? styles.segLive : ''}`}
                    style={{ animationDelay: `${s * 80}ms` }}
                  />
                ))}
              </span>

              <span className={styles.chFader} aria-hidden="true">
                <span className={styles.faderCap} style={{ bottom: on ? '58%' : '30%' }} />
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
