import { useMemo, useState } from 'react'
import styles from './ConceptWaveformTimeline.module.css'
import { TRACKS, Cover } from './labMedia.jsx'

/**
 * CONCEPT 01 — "Waveform Timeline"
 *
 * The video reel and the soundtrack list share one horizontal instrument.
 * A single continuous waveform spans the section; each track is a chapter
 * marker pinned along it. Selecting a marker scrubs the timeline, fills the
 * played portion of the wave, and re-cues the video panel above.
 */
export default function ConceptWaveformTimeline() {
  const [active, setActive] = useState(0)
  const track = TRACKS[active]

  // Deterministic waveform bar heights so the wave is stable across renders.
  const bars = useMemo(
    () => Array.from({ length: 120 }, (_, i) => 18 + Math.abs(Math.sin(i * 0.5) * Math.cos(i * 0.13)) * 82),
    [],
  )
  const playedTo = ((active + 0.5) / TRACKS.length) * bars.length

  return (
    <div className={styles.wrap}>
      <div className={styles.stage}>
        <div className={styles.screen}>
          <Cover src={track.cover} seed={active} alt="" className={styles.screenImg} />
          <div className={styles.screenGrad} />
          <button className={styles.playBtn} aria-label={`Play ${track.title}`}>
            <span className={styles.playTri} />
          </button>
          <div className={styles.screenMeta}>
            <span className={styles.nowTag}>Now cueing</span>
            <h3 className={styles.screenTitle}>{track.title}</h3>
            <p className={styles.screenSub}>{track.category} · {track.mood} · {track.duration}</p>
          </div>
        </div>
      </div>

      <div className={styles.timeline}>
        <div className={styles.wave} role="group" aria-label="Soundtrack timeline">
          {bars.map((h, i) => (
            <span
              key={i}
              className={`${styles.bar} ${i <= playedTo ? styles.barPlayed : ''}`}
              style={{ height: `${h}%` }}
            />
          ))}

          {TRACKS.map((t, i) => {
            const left = ((i + 0.5) / TRACKS.length) * 100
            return (
              <button
                key={t.id}
                className={`${styles.marker} ${i === active ? styles.markerActive : ''}`}
                style={{ left: `${left}%` }}
                onClick={() => setActive(i)}
                aria-label={`Cue ${t.title}`}
                aria-pressed={i === active}
              >
                <span className={styles.markerDot} />
                <span className={styles.markerLabel}>{String(i + 1).padStart(2, '0')}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className={styles.chips}>
        {TRACKS.map((t, i) => (
          <button
            key={t.id}
            className={`${styles.chip} ${i === active ? styles.chipActive : ''}`}
            onClick={() => setActive(i)}
          >
            <span className={styles.chipNum}>{String(i + 1).padStart(2, '0')}</span>
            <span className={styles.chipTitle}>{t.title}</span>
            <span className={styles.chipTime}>{t.duration}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
