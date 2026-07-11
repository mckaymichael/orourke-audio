import { useState } from 'react'
import styles from './ConceptSignalHUD.module.css'
import { TRACKS, Cover } from './labMedia.jsx'

/**
 * CONCEPT 10 — "Signal HUD"
 *
 * A broadcast control-room readout. A scanline video monitor on the left, a
 * terminal-style tracklist log on the right with live signal-strength bars
 * and a blinking cursor. Selecting a line "tunes in" that track on the
 * monitor. Reel and list read as one instrument panel.
 */
export default function ConceptSignalHUD() {
  const [active, setActive] = useState(0)
  const track = TRACKS[active]

  return (
    <div className={styles.wrap}>
      {/* ── Monitor ─────────────────────────────────────────── */}
      <div className={styles.monitor}>
        <div className={styles.frameTop}>
          <span>CH.{String(active + 1).padStart(2, '0')}</span>
          <span className={styles.live}>● ON AIR</span>
          <span>{track.duration}</span>
        </div>
        <div className={styles.screen}>
          <Cover src={track.cover} seed={active} alt="" className={styles.screenImg} />
          <div className={styles.scan} />
          <div className={styles.vignette} />
          <div className={styles.screenMeta}>
            <span className={styles.tuned}>TUNED IN</span>
            <h3 className={styles.screenTitle}>{track.title}</h3>
            <p className={styles.screenSub}>{track.category} · {track.mood}</p>
          </div>
          <div className={styles.scopeRow} aria-hidden="true">
            {Array.from({ length: 40 }, (_, i) => (
              <span key={i} className={styles.scopeBar} style={{ animationDelay: `${i * 40}ms` }} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Terminal tracklist ──────────────────────────────── */}
      <div className={styles.terminal}>
        <div className={styles.termHead}>
          <span>orourke_audio ~/ reel.log</span>
          <span className={styles.dots}><i /><i /><i /></span>
        </div>
        <div className={styles.log} role="list">
          {TRACKS.map((t, i) => {
            const on = i === active
            const strength = 2 + (i % 4)
            return (
              <button
                key={t.id}
                role="listitem"
                className={`${styles.line} ${on ? styles.lineOn : ''}`}
                onClick={() => setActive(i)}
                aria-pressed={on}
              >
                <span className={styles.prompt}>{on ? '▶' : '$'}</span>
                <span className={styles.lineNo}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.lineTitle}>{t.title}</span>
                <span className={styles.lineCat}>[{t.category}]</span>
                <span className={styles.signal} aria-label={`signal ${strength} of 5`}>
                  {Array.from({ length: 5 }, (_, s) => (
                    <span key={s} className={`${styles.sigBar} ${s < strength + (on ? 1 : 0) ? styles.sigOn : ''}`} />
                  ))}
                </span>
                <span className={styles.lineTime}>{t.duration}</span>
                {on && <span className={styles.cursor} aria-hidden="true" />}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
