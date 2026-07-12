import { useEffect, useRef, useState } from 'react'
import styles from './HeroStudies.module.css'
import UnicornScene from '../../components/UnicornScene/UnicornScene.jsx'
import { PrimaryBtn, SecondaryBtn } from './LabButtons.jsx'
import videoThumbnail from '../../images/video-thumbnail.jpg'

/**
 * HERO SECTION STUDIES, H01 through H10.
 *
 * Ten full hero sections, each leading with the featured reel and each
 * built around one distinct animation mechanic:
 *
 *   H01 Curtain Reveal   panels part and type staggers in on view
 *   H02 Click Expand     a docked video card expands to full stage
 *   H03 Parallax Depth   pointer-driven layered depth
 *   H04 Scroll Cinema    the reel scales up as you scroll through
 *   H05 Split Slider     a slide deck hero with eased transitions
 *   H06 Ember Veil       smoke shader, video revealed from behind a veil
 *   H07 Typewriter Stage headline types out, marquee ribbon below
 *   H08 Orbit Stage      meta chips orbit the reel, stage tilts in 3D
 *   H09 Letterbox        cinema bars open on view, widen on hover
 *   H10 Ripple Portal    ripple shader, circular portal morphs open
 *
 * Everything runs on CSS transitions and keyframes plus small amounts of
 * rAF / IntersectionObserver glue. No new dependencies. All motion
 * respects prefers-reduced-motion. Buttons are the approved LabButtons.
 */

const COPY = {
  eyebrow: 'Vancouver · Original Music for Games',
  title: 'Your game deserves music built for it.',
  sub: "Your game's soundtrack already exists within the world you built. Let's uncover it together.",
  reelTitle: 'Rooftops and Alleys',
  reelMeta: 'Trailer Composition · Parkour Videogame',
}

function ReelVideo({ className }) {
  return (
    <video
      controls
      className={className}
      preload="metadata"
      poster={videoThumbnail}
      aria-label="Ryan O'Rourke Featured Composition Reel"
    >
      <source src="/video/featured-reel.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

function StudyTag({ id, name }) {
  return (
    <p className={styles.studyTag}>
      <span className={styles.studyId}>{id}</span> {name}
    </p>
  )
}

/* Adds a class once the element scrolls into view, for entrance motion. */
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

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ── H01 · Curtain Reveal ─────────────────────────────────── */
function StudyCurtain() {
  const [ref, inView] = useInView()
  const words = COPY.title.split(' ')
  return (
    <section ref={ref} className={`${styles.h01} ${inView ? styles.h01In : ''}`}>
      <StudyTag id="H01" name="Curtain Reveal" />
      <div className={styles.h01Stage}>
        <ReelVideo className={styles.h01Video} />
        <span className={`${styles.h01Panel} ${styles.h01PanelL}`} aria-hidden="true" />
        <span className={`${styles.h01Panel} ${styles.h01PanelR}`} aria-hidden="true" />
        <div className={styles.h01Overlay}>
          <p className={styles.eyebrow}>{COPY.eyebrow}</p>
          <h2 className={styles.h01Title}>
            {words.map((w, i) => (
              <span key={i} className={styles.h01WordWrap}>
                <span className={styles.h01Word}>{w}&nbsp;</span>
              </span>
            ))}
          </h2>
          <div className={styles.btnRow}>
            <PrimaryBtn to="/portfolio">View Work</PrimaryBtn>
            <SecondaryBtn to="/contact">Say Hello</SecondaryBtn>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── H02 · Click Expand ───────────────────────────────────── */
function StudyClickExpand() {
  const [expanded, setExpanded] = useState(false)
  return (
    <section className={`${styles.h02} ${expanded ? styles.h02Expanded : ''}`}>
      <StudyTag id="H02" name="Click Expand" />
      <div className={styles.h02Stage}>
        <div className={styles.h02Copy}>
          <p className={styles.eyebrow}>{COPY.eyebrow}</p>
          <h2 className={styles.heroTitle}>{COPY.title}</h2>
          <p className={styles.subText}>{COPY.sub}</p>
          <div className={styles.btnRow}>
            <PrimaryBtn to="/contact">Say Hello</PrimaryBtn>
            <SecondaryBtn to="/portfolio">View Work</SecondaryBtn>
          </div>
        </div>
        <div className={styles.h02Dock}>
          <button
            type="button"
            className={styles.h02Toggle}
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? 'Collapse Reel' : 'Expand Reel'}
            <span className={styles.h02ToggleIcon} aria-hidden="true" />
          </button>
          <div className={styles.h02Card}>
            <ReelVideo className={styles.videoCover} />
            <p className={styles.cardCaption}>{COPY.reelTitle}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── H03 · Parallax Depth ─────────────────────────────────── */
function StudyParallax() {
  const stageRef = useRef(null)

  function onMove(e) {
    const el = stageRef.current
    if (!el || prefersReducedMotion()) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty('--px', x.toFixed(4))
    el.style.setProperty('--py', y.toFixed(4))
  }

  function onLeave() {
    const el = stageRef.current
    if (!el) return
    el.style.setProperty('--px', '0')
    el.style.setProperty('--py', '0')
  }

  return (
    <section className={styles.h03}>
      <StudyTag id="H03" name="Parallax Depth" />
      <div
        ref={stageRef}
        className={styles.h03Stage}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <span className={styles.h03Ghost} aria-hidden="true">O'ROURKE</span>
        <div className={styles.h03VideoLayer}>
          <div className={styles.h03Frame}>
            <ReelVideo className={styles.videoCover} />
          </div>
        </div>
        <div className={styles.h03Front}>
          <p className={styles.eyebrow}>{COPY.eyebrow}</p>
          <h2 className={styles.heroTitle}>{COPY.title}</h2>
          <div className={styles.btnRow}>
            <PrimaryBtn to="/portfolio">View Work</PrimaryBtn>
            <SecondaryBtn to="/contact">Say Hello</SecondaryBtn>
          </div>
        </div>
        <span className={`${styles.h03Chip} ${styles.h03ChipA}`} aria-hidden="true">{COPY.reelMeta}</span>
        <span className={`${styles.h03Chip} ${styles.h03ChipB}`} aria-hidden="true">Stems · Loops · Implementation</span>
      </div>
    </section>
  )
}

/* ── H04 · Scroll Cinema ──────────────────────────────────── */
function StudyScrollCinema() {
  const trackRef = useRef(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return undefined
    if (prefersReducedMotion()) {
      el.style.setProperty('--p', '1')
      return undefined
    }
    let raf = 0
    const tick = () => {
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(total, 1)))
      el.style.setProperty('--p', p.toFixed(4))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section className={styles.h04}>
      <StudyTag id="H04" name="Scroll Cinema" />
      <div ref={trackRef} className={styles.h04Track}>
        <div className={styles.h04Sticky}>
          <div className={styles.h04Text}>
            <p className={styles.eyebrow}>{COPY.eyebrow}</p>
            <h2 className={styles.heroTitle}>{COPY.title}</h2>
            <p className={styles.h04Hint}>Keep scrolling, the reel takes the stage.</p>
          </div>
          <div className={styles.h04Screen}>
            <ReelVideo className={styles.videoCover} />
          </div>
          <div className={styles.h04Cta}>
            <PrimaryBtn to="/portfolio">View Work</PrimaryBtn>
            <SecondaryBtn to="/contact">Say Hello</SecondaryBtn>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── H05 · Split Slider ───────────────────────────────────── */
function StudySlider() {
  const [index, setIndex] = useState(0)
  const slides = [
    { kind: 'video', title: COPY.reelTitle, meta: COPY.reelMeta },
    { kind: 'image', title: 'Placeholder Project 02', meta: 'Exploration Theme' },
    { kind: 'image', title: 'Placeholder Project 03', meta: 'Combat Loop' },
  ]
  const go = (dir) => setIndex((i) => (i + dir + slides.length) % slides.length)

  return (
    <section className={styles.h05}>
      <StudyTag id="H05" name="Split Slider" />
      <div className={styles.h05Stage}>
        <div className={styles.h05Copy}>
          <p className={styles.eyebrow}>{COPY.eyebrow}</p>
          <h2 className={styles.heroTitle}>{COPY.title}</h2>
          <div className={styles.h05Meta}>
            <span className={styles.h05Count}>
              {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
            <span className={styles.h05SlideTitle}>{slides[index].title}</span>
          </div>
          <div className={styles.h05Controls}>
            <button type="button" className={styles.h05Arrow} onClick={() => go(-1)} aria-label="Previous slide">
              &larr;
            </button>
            <button type="button" className={styles.h05Arrow} onClick={() => go(1)} aria-label="Next slide">
              &rarr;
            </button>
          </div>
          <div className={styles.btnRow}>
            <PrimaryBtn to="/portfolio">Full Portfolio</PrimaryBtn>
          </div>
        </div>
        <div className={styles.h05Window}>
          <div className={`${styles.h05Belt} ${styles[`h05Pos${index}`]}`}>
            {slides.map((s) => (
              <div key={s.title} className={styles.h05Slide}>
                {s.kind === 'video' ? (
                  <ReelVideo className={styles.videoCover} />
                ) : (
                  <img src={videoThumbnail} alt="" className={styles.videoCover} loading="lazy" />
                )}
                <p className={styles.cardCaption}>{s.title} · {s.meta}</p>
              </div>
            ))}
          </div>
          <div className={styles.h05Dots}>
            {slides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                className={`${styles.h05Dot} ${i === index ? styles.h05DotActive : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── H06 · Ember Veil ─────────────────────────────────────── */
function StudyEmberVeil() {
  const [lifted, setLifted] = useState(false)
  return (
    <section className={styles.h06}>
      <StudyTag id="H06" name="Ember Veil" />
      <div className={styles.h06Stage}>
        <UnicornScene variant="emberFlow" />
        <div className={styles.h06Content}>
          <p className={styles.eyebrow}>{COPY.eyebrow}</p>
          <h2 className={styles.heroTitle}>{COPY.title}</h2>
          <div className={`${styles.h06VeilWrap} ${lifted ? styles.h06Lifted : ''}`}>
            <ReelVideo className={styles.videoCover} />
            <button
              type="button"
              className={styles.h06Veil}
              onClick={() => setLifted(true)}
              aria-label="Reveal the featured reel"
            >
              <span className={styles.h06PlayRing} aria-hidden="true">
                <span className={styles.h06PlayTri} />
              </span>
              <span className={styles.h06VeilText}>Watch the reel</span>
            </button>
          </div>
          <div className={styles.btnRow}>
            <PrimaryBtn to="/portfolio">View Work</PrimaryBtn>
            <SecondaryBtn to="/contact">Say Hello</SecondaryBtn>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── H07 · Typewriter Stage ───────────────────────────────── */
function StudyTypewriter() {
  const [ref, inView] = useInView()
  const [chars, setChars] = useState(0)

  useEffect(() => {
    if (!inView) return undefined
    if (prefersReducedMotion()) {
      setChars(COPY.title.length)
      return undefined
    }
    const id = setInterval(() => {
      setChars((c) => {
        if (c >= COPY.title.length) {
          clearInterval(id)
          return c
        }
        return c + 1
      })
    }, 45)
    return () => clearInterval(id)
  }, [inView])

  const done = chars >= COPY.title.length
  const ribbon = 'Original Score · Stems and Loops · Unity · Unreal · Custom Engines · '

  return (
    <section ref={ref} className={styles.h07}>
      <StudyTag id="H07" name="Typewriter Stage" />
      <div className={styles.h07Stage}>
        <p className={styles.eyebrow}>{COPY.eyebrow}</p>
        <h2 className={styles.h07Title}>
          {COPY.title.slice(0, chars)}
          <span className={`${styles.h07Caret} ${done ? styles.h07CaretDone : ''}`} aria-hidden="true" />
        </h2>
        <div className={`${styles.h07Riser} ${done ? styles.h07RiserUp : ''}`}>
          <ReelVideo className={styles.videoCover} />
        </div>
        <div className={styles.btnRow}>
          <PrimaryBtn to="/portfolio">View Work</PrimaryBtn>
          <SecondaryBtn to="/contact">Say Hello</SecondaryBtn>
        </div>
      </div>
      <div className={styles.h07Ribbon} aria-hidden="true">
        <span className={styles.h07RibbonInner}>{ribbon.repeat(4)}</span>
      </div>
    </section>
  )
}

/* ── H08 · Orbit Stage ────────────────────────────────────── */
function StudyOrbit() {
  const stageRef = useRef(null)

  function onMove(e) {
    const el = stageRef.current
    if (!el || prefersReducedMotion()) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.setProperty('--tiltX', `${(-y * 6).toFixed(2)}deg`)
    el.style.setProperty('--tiltY', `${(x * 8).toFixed(2)}deg`)
  }

  function onLeave() {
    const el = stageRef.current
    if (!el) return
    el.style.setProperty('--tiltX', '0deg')
    el.style.setProperty('--tiltY', '0deg')
  }

  const chips = ['Original Score', 'Stems + Loops', 'Unity / Unreal', '24h Replies']

  return (
    <section className={styles.h08}>
      <StudyTag id="H08" name="Orbit Stage" />
      <div className={styles.h08Layout}>
        <div className={styles.h08Copy}>
          <p className={styles.eyebrow}>{COPY.eyebrow}</p>
          <h2 className={styles.heroTitle}>{COPY.title}</h2>
          <p className={styles.subText}>{COPY.sub}</p>
          <div className={styles.btnRow}>
            <PrimaryBtn to="/contact">Say Hello</PrimaryBtn>
            <SecondaryBtn to="/portfolio">View Work</SecondaryBtn>
          </div>
        </div>
        <div
          ref={stageRef}
          className={styles.h08Stage}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
        >
          <div className={styles.h08Tilt}>
            <div className={styles.h08Frame}>
              <ReelVideo className={styles.videoCover} />
            </div>
            <div className={styles.h08Orbit} aria-hidden="true">
              {chips.map((c, i) => (
                <span key={c} className={`${styles.h08ChipArm} ${styles[`h08Arm${i}`]}`}>
                  <span className={styles.h08Chip}>{c}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── H09 · Letterbox ──────────────────────────────────────── */
function StudyLetterbox() {
  const [ref, inView] = useInView()
  return (
    <section ref={ref} className={`${styles.h09} ${inView ? styles.h09In : ''}`}>
      <StudyTag id="H09" name="Letterbox" />
      <div className={styles.h09Stage}>
        <ReelVideo className={styles.h09Video} />
        <span className={`${styles.h09Bar} ${styles.h09BarTop}`} aria-hidden="true" />
        <span className={`${styles.h09Bar} ${styles.h09BarBottom}`} aria-hidden="true" />
        <div className={styles.h09TitlePlate}>
          <p className={styles.eyebrow}>{COPY.reelMeta}</p>
          <h2 className={styles.h09Title}>{COPY.reelTitle}</h2>
        </div>
      </div>
      <div className={styles.h09Below}>
        <p className={styles.subText}>{COPY.sub}</p>
        <div className={styles.btnRow}>
          <PrimaryBtn to="/portfolio">View Work</PrimaryBtn>
          <SecondaryBtn to="/contact">Say Hello</SecondaryBtn>
        </div>
      </div>
    </section>
  )
}

/* ── H10 · Ripple Portal ──────────────────────────────────── */
function StudyRipplePortal() {
  return (
    <section className={styles.h10}>
      <StudyTag id="H10" name="Ripple Portal" />
      <div className={styles.h10Stage}>
        <UnicornScene variant="ripple" />
        <div className={styles.h10Content}>
          <div className={styles.h10Copy}>
            <p className={styles.eyebrow}>{COPY.eyebrow}</p>
            <h2 className={styles.heroTitle}>{COPY.title}</h2>
            <div className={styles.btnRow}>
              <PrimaryBtn to="/contact">Say Hello</PrimaryBtn>
              <SecondaryBtn to="/portfolio">View Work</SecondaryBtn>
            </div>
          </div>
          <div className={styles.h10Portal}>
            <ReelVideo className={styles.h10Video} />
            <span className={styles.h10PortalRing} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HeroStudies() {
  return (
    <div className={styles.wrap}>
      <StudyCurtain />
      <StudyClickExpand />
      <StudyParallax />
      <StudyScrollCinema />
      <StudySlider />
      <StudyEmberVeil />
      <StudyTypewriter />
      <StudyOrbit />
      <StudyLetterbox />
      <StudyRipplePortal />
    </div>
  )
}
