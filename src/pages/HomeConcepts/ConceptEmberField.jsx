import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './ConceptEmberField.module.css'
import UnicornScene from '../../components/UnicornScene/UnicornScene.jsx'
import videoThumbnail from '../../images/video-thumbnail.jpg'

/**
 * CONCEPT C, "Ember Field"
 *
 * A cinematic full-viewport hero where the layout gets out of the way and
 * the ember shader carries the mood. Oversized centered type sits directly
 * on the shader with a scrim for contrast. The differentiators become an
 * interactive accordion, and the reel floats in a framed card.
 *
 * Interaction feedback explored here:
 * - Magnetic buttons: the CTA buttons lean toward the cursor and spring
 *   back on leave, with a pressed-in active state.
 * - Click ripples: primary actions emit an expanding ring on click.
 * - Sweep links: text links reveal a left-to-right underline on hover
 *   and focus, and nudge forward on press.
 * - Accordion rows: hover raises the row and rotates the indicator;
 *   the open state is announced via aria-expanded.
 *
 * Dynamic values (magnet offset, ripple origin) are passed to the module
 * CSS through custom properties set in event handlers. Static styling
 * stays in the CSS module.
 */

const WHY_ROWS = [
  {
    label: '01',
    title: 'Music that fits the world.',
    body: "Ryan composes original music, not stock tracks or temp-music swaps. Every piece is built around your game's tone, pacing, and emotional arc. The soundtrack feels inevitable because it was written for your game specifically.",
  },
  {
    label: '02',
    title: 'Stems ready for your pipeline.',
    body: 'Deliverables come as stems and loops formatted for your engine. Whether you are working in Unity, Unreal, or a custom setup, Ryan structures the audio so your team can drop it in and adapt it without extra back-and-forth.',
  },
  {
    label: '03',
    title: 'Built for indie studios.',
    body: 'Transparent pricing, clear scope, real timelines. Ryan works lean and communicates openly, with no studio overhead or runaround. You know what you are getting before the project starts.',
  },
]

function MagneticLink({ to, kind, children }) {
  const ref = useRef(null)

  function onMove(e) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.setProperty('--mx', `${x * 0.22}px`)
    el.style.setProperty('--my', `${y * 0.28}px`)
  }

  function onLeave() {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--mx', '0px')
    el.style.setProperty('--my', '0px')
  }

  function onClick(e) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const ripple = document.createElement('span')
    ripple.className = styles.ripple
    ripple.style.setProperty('--rx', `${e.clientX - rect.left}px`)
    ripple.style.setProperty('--ry', `${e.clientY - rect.top}px`)
    el.appendChild(ripple)
    ripple.addEventListener('animationend', () => ripple.remove())
  }

  const cls = kind === 'primary' ? styles.magnetPrimary : styles.magnetGhost

  return (
    <Link
      ref={ref}
      to={to}
      className={`${styles.magnetBtn} ${cls}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={onClick}
    >
      <span className={styles.magnetLabel}>{children}</span>
    </Link>
  )
}

export default function ConceptEmberField() {
  const [open, setOpen] = useState(0)

  return (
    <div className={styles.page}>

      {/* ── Hero: type directly on the shader ─────────────────── */}
      <section className={styles.hero}>
        <UnicornScene variant="emberFlow" />
        <div className={styles.heroScrim} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <p className={styles.eyebrow}>Vancouver · Original Music for Games</p>
          <h1 className={styles.heroTitle}>
            Your game deserves<br />music built for it.
          </h1>
          <p className={styles.heroSub}>
            Your game's soundtrack already exists within the world you built.
            Let's uncover it together.
          </p>
          <div className={styles.heroCtaRow}>
            <MagneticLink to="/contact" kind="primary">Say Hello</MagneticLink>
            <MagneticLink to="/portfolio" kind="ghost">View Work</MagneticLink>
          </div>
          <div className={styles.scrollHint} aria-hidden="true">
            <span className={styles.scrollDot} />
          </div>
        </div>
      </section>

      {/* ── Why Ryan: interactive accordion ───────────────────── */}
      <section className={styles.why}>
        <div className="container">
          <p className="section-label">Why Ryan</p>
          <div className={styles.accordion}>
            {WHY_ROWS.map(({ label, title, body }, i) => {
              const isOpen = open === i
              return (
                <div key={label} className={`${styles.accRow} ${isOpen ? styles.accRowOpen : ''}`}>
                  <button
                    type="button"
                    className={styles.accHead}
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className={styles.accLabel}>{label}</span>
                    <span className={styles.accTitle}>{title}</span>
                    <span className={styles.accIcon} aria-hidden="true" />
                  </button>
                  <div className={styles.accBodyWrap}>
                    <p className={styles.accBody}>{body}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Featured reel in a floating frame ─────────────────── */}
      <section className={styles.reel}>
        <div className={`container ${styles.reelInner}`}>
          <div className={styles.reelMeta}>
            <p className="section-label">Featured Reel</p>
            <h2 className={styles.reelTitle}>Rooftops and Alleys</h2>
            <p className={styles.reelBody}>
              Trailer composition for a parkour videogame. Watch how the score
              tracks momentum and holds tension between runs.
            </p>
            <Link to="/portfolio" className={styles.sweepLink}>
              Explore the full portfolio
            </Link>
          </div>
          <div className={styles.reelCard}>
            <video
              controls
              className={styles.reelVideo}
              preload="metadata"
              poster={videoThumbnail}
              aria-label="Ryan O'Rourke Featured Composition Reel"
            >
              <source src="/video/featured-reel.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* ── CTA over an ember strip ───────────────────────────── */}
      <section className={styles.cta}>
        <UnicornScene variant="emberFlow" />
        <div className={styles.ctaScrim} aria-hidden="true" />
        <div className={`container ${styles.ctaInner}`}>
          <h2 className={styles.ctaTitle}>Want to work together?</h2>
          <p className={styles.ctaBody}>
            I am looking to connect with studios and developers in the game
            audio world. I will get back to you within 24 hours.
          </p>
          <MagneticLink to="/contact" kind="primary">Say Hello</MagneticLink>
          <p className={styles.ctaNote}>Available remotely worldwide.</p>
        </div>
      </section>

    </div>
  )
}
