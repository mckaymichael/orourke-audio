import { useEffect, useRef, useState } from 'react'
import styles from './ConceptScrollScenes.module.css'
import { TRACKS, Cover } from './labMedia.jsx'

/**
 * CONCEPT 06 — "Scroll Scenes"
 *
 * Scrollytelling. Full-width scene panels (the video reel) scroll past while
 * a sticky player bar pins to the bottom of the section and re-tunes itself
 * to whichever scene is currently on screen. The reel drives the soundtrack
 * list automatically instead of the visitor hunting through it.
 */
export default function ConceptScrollScenes() {
  const [active, setActive] = useState(0)
  const sceneRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index)
            setActive(idx)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    sceneRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const track = TRACKS[active]

  return (
    <div className={styles.wrap}>
      <div className={styles.scenes}>
        {TRACKS.map((t, i) => (
          <section
            key={t.id}
            data-index={i}
            ref={(el) => (sceneRefs.current[i] = el)}
            className={`${styles.scene} ${i === active ? styles.sceneActive : ''}`}
          >
            <Cover src={t.cover} seed={i} alt="" className={styles.sceneImg} />
            <div className={styles.sceneVeil} />
            <div className={styles.sceneText}>
              <span className={styles.sceneIndex}>{String(i + 1).padStart(2, '0')} / {String(TRACKS.length).padStart(2, '0')}</span>
              <h3 className={styles.sceneTitle}>{t.title}</h3>
              <p className={styles.sceneCat}>{t.category} · {t.mood}</p>
            </div>
          </section>
        ))}
      </div>

      {/* Sticky player bar */}
      <div className={styles.bar}>
        <span className={styles.barThumb}>
          <Cover src={track.cover} seed={active} alt="" className={styles.barImg} />
        </span>
        <span className={styles.barInfo}>
          <span className={styles.barNow}>Now scoring this scene</span>
          <span className={styles.barTitle}>{track.title}</span>
        </span>
        <span className={styles.barWave} aria-hidden="true">
          {Array.from({ length: 28 }, (_, i) => (
            <span key={i} className={styles.barBar} style={{ animationDelay: `${i * 45}ms` }} />
          ))}
        </span>
        <span className={styles.barTime}>{track.duration}</span>
      </div>
    </div>
  )
}
