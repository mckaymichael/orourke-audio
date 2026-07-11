import { useState } from 'react'
import styles from './ConceptTapeLibrary.module.css'
import { TRACKS, Cover } from './labMedia.jsx'

/**
 * CONCEPT 07 — "Tape Library"
 *
 * Skeuomorphic. Every soundtrack is a labelled cassette on a shelf. Slotting
 * one into the deck spins its reels and lights the small monitor beside it,
 * pairing each audio track with its scene. Tactile and collectible.
 */
export default function ConceptTapeLibrary() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const track = TRACKS[active]

  return (
    <div className={styles.wrap}>
      {/* ── Deck ────────────────────────────────────────────── */}
      <div className={styles.deck}>
        <div className={styles.deckScreen}>
          <Cover src={track.cover} seed={active} alt="" className={styles.deckImg} />
          <div className={styles.deckScan} />
          <span className={styles.deckDot}>{playing ? '▶ PLAY' : '❚❚ PAUSE'}</span>
        </div>

        <div className={styles.loadedTape}>
          <div className={styles.tapeWindow}>
            <span className={`${styles.reel} ${playing ? styles.reelSpin : ''}`} />
            <span className={styles.tapeSpan} />
            <span className={`${styles.reel} ${playing ? styles.reelSpin : ''}`} />
          </div>
          <div className={styles.deckMeta}>
            <span className={styles.deckCat}>{track.category}</span>
            <h3 className={styles.deckTitle}>{track.title}</h3>
            <span className={styles.deckTime}>{track.mood} · {track.duration}</span>
          </div>
          <button className={styles.deckBtn} onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause' : 'Play'}>
            {playing ? '❚❚' : '►'}
          </button>
        </div>
      </div>

      {/* ── Shelf of tapes ──────────────────────────────────── */}
      <div className={styles.shelf} role="list" aria-label="Cassette library">
        {TRACKS.map((t, i) => (
          <button
            key={t.id}
            role="listitem"
            className={`${styles.tape} ${i === active ? styles.tapeActive : ''}`}
            onClick={() => { setActive(i); setPlaying(true) }}
            aria-pressed={i === active}
          >
            <span className={styles.tapeLabel}>
              <span className={styles.tapeNo}>NO.{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.tapeName}>{t.title}</span>
              <span className={styles.tapeSub}>{t.category}</span>
            </span>
            <span className={styles.tapeHoles}>
              <span className={styles.hole} />
              <span className={styles.hole} />
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
