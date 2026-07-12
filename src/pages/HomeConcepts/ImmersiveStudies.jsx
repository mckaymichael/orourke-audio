import { useEffect, useRef, useState } from 'react'
import styles from './ImmersiveStudies.module.css'
import { PrimaryBtn, SecondaryBtn } from './LabButtons.jsx'
import videoThumbnail from '../../images/video-thumbnail.jpg'

/**
 * IMMERSIVE CURTAIN STUDIES, I01 through I05.
 *
 * Architecture: the video IS the hero background. The stage is a full
 * 100vh section and the video fills it from first paint, paused on its
 * poster frame behind the curtain reveal. Pressing play changes nothing
 * about the video's position, size, or crop. Ever. The page glides into
 * alignment with an eased scroll, the hero UI exits, scroll locks, and
 * native controls plus an exit pill fade in. Because the video never
 * moves between layouts, there is no geometry handoff left to snap.
 *
 * Exit (button or Escape) pauses playback, unlocks scroll, and the UI
 * slides back in over the still-visible frame.
 *
 * The five studies differ only in the choreography of the UI exit:
 *   I01 Slide Away     copy exits stage left, buttons stage right
 *   I02 Focus Pull     UI shrinks and blurs toward the play point
 *   I03 Cinema Drop    UI sinks while the picture ramps from dark
 *   I04 Curtain Sweep  curtains sweep across, wiping the UI away,
 *                      then part again on the clean video
 *   I05 Zoom Dive      UI zooms past the camera, video eases forward
 */

const COPY = {
  eyebrow: 'Vancouver · Original Music for Games',
  title: 'Your game deserves music built for it.',
  reelTitle: 'Rooftops and Alleys · Trailer Composition',
}

function useInView(threshold = 0.3) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return [ref, inView]
}

const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Eases the page until the stage exactly fills the viewport, then calls
   done. Cubic ease-out over a distance-scaled duration. */
function alignStage(stage, done) {
  const target = stage.getBoundingClientRect().top + window.scrollY
  const start = window.scrollY
  const dist = target - start

  if (Math.abs(dist) < 2 || reducedMotion()) {
    window.scrollTo(0, target)
    done()
    return () => {}
  }

  const duration = Math.min(800, 350 + Math.abs(dist) * 0.35)
  const t0 = performance.now()
  const ease = (t) => 1 - Math.pow(1 - t, 3)
  let raf = 0

  const step = (now) => {
    const t = Math.min(1, (now - t0) / duration)
    window.scrollTo(0, start + dist * ease(t))
    if (t < 1) {
      raf = requestAnimationFrame(step)
    } else {
      done()
    }
  }
  raf = requestAnimationFrame(step)
  return () => cancelAnimationFrame(raf)
}

function lockScroll(lock) {
  if (lock) {
    const gap = window.innerWidth - document.documentElement.clientWidth
    document.body.style.paddingRight = gap > 0 ? `${gap}px` : ''
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  }
}

function ImmersiveCurtain({ id, name, variant }) {
  const [ref, inView] = useInView()
  /* idle -> open (UI exiting while the page glides into alignment,
     then scroll locks) -> idle on exit. One state change per direction,
     so every property animates on a single uninterrupted timeline. */
  const [open, setOpen] = useState(false)
  const stageRef = useRef(null)
  const videoRef = useRef(null)
  const cancelAlignRef = useRef(() => {})

  function enter(e) {
    const stage = stageRef.current
    const video = videoRef.current
    if (!stage || !video || open) return

    if (e) {
      const rect = stage.getBoundingClientRect()
      stage.style.setProperty('--ox', `${(((e.clientX - rect.left) / rect.width) * 100).toFixed(2)}%`)
      stage.style.setProperty('--oy', `${(((e.clientY - rect.top) / rect.height) * 100).toFixed(2)}%`)
    }

    video.play().catch(() => {})
    setOpen(true)
    cancelAlignRef.current = alignStage(stage, () => lockScroll(true))
  }

  function exit() {
    cancelAlignRef.current()
    const video = videoRef.current
    if (video) video.pause()
    lockScroll(false)
    setOpen(false)
  }

  useEffect(
    () => () => {
      cancelAlignRef.current()
      lockScroll(false)
    },
    []
  )

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') exit()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const words = COPY.title.split(' ')
  const rootCls = [
    styles.study,
    styles[variant],
    inView ? styles.inView : '',
    open ? styles.open : '',
  ].join(' ')

  return (
    <section ref={ref} className={rootCls}>
      <p className={styles.studyTag}>
        <span className={styles.studyId}>{id}</span> {name}
      </p>

      <div ref={stageRef} className={styles.stage}>

        {/* The video background. Present, full-bleed, and never moved,
            resized, or re-cropped for the rest of its life. */}
        <video
          ref={videoRef}
          className={styles.video}
          preload="metadata"
          poster={videoThumbnail}
          controls={open}
          playsInline
          aria-label="Ryan O'Rourke Featured Composition Reel"
        >
          <source src="/video/featured-reel.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Curtain panels for the on-scroll reveal, reused by I04 as
            the takeover wipe. */}
        <span className={`${styles.panel} ${styles.panelL}`} aria-hidden="true" />
        <span className={`${styles.panel} ${styles.panelR}`} aria-hidden="true" />

        {/* Hero UI. The only thing the takeover animates. */}
        <div className={styles.ui}>
          <div className={styles.uiInner}>
            <p className={`${styles.eyebrow} ${styles.uiLeft}`}>{COPY.eyebrow}</p>
            <h2 className={`${styles.title} ${styles.uiLeft}`}>
              {words.map((w, i) => (
                <span key={i} className={styles.wordWrap}>
                  <span className={styles.word}>{w}&nbsp;</span>
                </span>
              ))}
            </h2>
            <div className={`${styles.btnRow} ${styles.uiRight}`}>
              <PrimaryBtn to="/portfolio">View Work</PrimaryBtn>
              <SecondaryBtn to="/contact">Say Hello</SecondaryBtn>
            </div>
          </div>
        </div>

        {/* Play affordance. */}
        <button
          type="button"
          className={styles.playBtn}
          onClick={enter}
          aria-label={`Play the featured reel: ${COPY.reelTitle}`}
        >
          <span className={styles.playRing} aria-hidden="true">
            <span className={styles.playPulse} />
            <span className={styles.playTri} />
          </span>
          <span className={styles.playLabel}>Play Video</span>
          <span className={styles.playMeta}>{COPY.reelTitle}</span>
        </button>

        {/* Exit control, lives with the stage since the stage is the
            immersive surface. */}
        <button type="button" className={styles.exitBtn} onClick={exit}>
          <span className={styles.exitGlyph} aria-hidden="true" />
          Exit
          <span className={styles.exitHint} aria-hidden="true">ESC</span>
        </button>

      </div>
    </section>
  )
}

export default function ImmersiveStudies() {
  return (
    <div className={styles.wrap}>
      <ImmersiveCurtain id="I01" name="Slide Away" variant="vSlide" />
      <ImmersiveCurtain id="I02" name="Focus Pull" variant="vFocus" />
      <ImmersiveCurtain id="I03" name="Cinema Drop" variant="vCinema" />
      <ImmersiveCurtain id="I04" name="Curtain Sweep" variant="vSweep" />
      <ImmersiveCurtain id="I05" name="Zoom Dive" variant="vZoom" />
    </div>
  )
}
