import { useState } from 'react'
import styles from './ConceptSwipeDeck.module.css'
import { TRACKS, Cover } from './labMedia.jsx'

/**
 * CONCEPT 09 — "Swipe Deck"
 *
 * A stacked card deck. The front card is the current work — a looping video
 * thumbnail with a player and its soundtrack detail. Next / previous flicks
 * the stack in 3D, and the fanned silhouette behind shows how deep the
 * catalogue runs. One focused item at a time, but the whole list is felt.
 */
export default function ConceptSwipeDeck() {
  const [active, setActive] = useState(0)
  const n = TRACKS.length

  const next = () => setActive((a) => (a + 1) % n)
  const prev = () => setActive((a) => (a - 1 + n) % n)

  return (
    <div className={styles.wrap}>
      <div className={styles.stageCol}>
        <div className={styles.deck}>
          {TRACKS.map((t, i) => {
            const pos = (i - active + n) % n // 0 = front
            if (pos > 3) return null
            return (
              <article
                key={t.id}
                className={styles.card}
                style={{
                  transform: `translate(-50%, -50%) translateY(${pos * -14}px) scale(${1 - pos * 0.06})`,
                  opacity: pos === 0 ? 1 : 0.55 - pos * 0.12,
                  zIndex: 10 - pos,
                  pointerEvents: pos === 0 ? 'auto' : 'none',
                }}
                aria-hidden={pos !== 0}
              >
                <div className={styles.cardArt}>
                  <Cover src={t.cover} seed={i} alt="" className={styles.cardImg} />
                  <div className={styles.cardVeil} />
                  <span className={styles.loopTag}>◉ LOOPING</span>
                  <button className={styles.cardPlay} aria-label={`Play ${t.title}`} tabIndex={pos === 0 ? 0 : -1}>
                    <span className={styles.tri} />
                  </button>
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.cardCat}>{t.category}</span>
                  <h3 className={styles.cardTitle}>{t.title}</h3>
                  <p className={styles.cardMood}>{t.mood}</p>
                  <div className={styles.cardScrub}>
                    <span className={styles.cardScrubFill} />
                  </div>
                  <div className={styles.cardTimes}>
                    <span>0:00</span><span>{t.duration}</span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className={styles.controls}>
          <button className={styles.ctrl} onClick={prev} aria-label="Previous track">‹</button>
          <span className={styles.counter}>{String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
          <button className={styles.ctrl} onClick={next} aria-label="Next track">›</button>
        </div>
      </div>

      {/* Up-next rail */}
      <aside className={styles.upNext}>
        <span className={styles.upHead}>Up next</span>
        {[1, 2, 3, 4].map((offset) => {
          const t = TRACKS[(active + offset) % n]
          return (
            <button
              key={t.id}
              className={styles.upRow}
              onClick={() => setActive((active + offset) % n)}
            >
              <span className={styles.upThumb}>
                <Cover src={t.cover} seed={(active + offset) % n} alt="" className={styles.upImg} />
              </span>
              <span className={styles.upInfo}>
                <span className={styles.upTitle}>{t.title}</span>
                <span className={styles.upCat}>{t.category}</span>
              </span>
              <span className={styles.upTime}>{t.duration}</span>
            </button>
          )
        })}
      </aside>
    </div>
  )
}
