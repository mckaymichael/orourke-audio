import { useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './ConceptPressureWave.module.css'
import UnicornScene from '../../components/UnicornScene/UnicornScene.jsx'
import videoThumbnail from '../../images/video-thumbnail.jpg'

/**
 * CONCEPT D, "Pressure Wave"
 *
 * An asymmetric split: copy anchors the left column while the right column
 * is a full-height ripple shader panel, waves radiating like sound pressure.
 * The reel floats over the shader as a card. Differentiators become 3D tilt
 * cards, and the closing CTA is one oversized slide-fill link.
 *
 * Interaction feedback explored here:
 * - Press buttons: hover lifts with a hard offset shadow, active presses
 *   flat, so clicks feel mechanical, like a pad on a drum machine.
 * - Tilt cards: cards pivot toward the cursor with a moving glare and
 *   reset on leave. Keyboard focus gets a static raised state instead.
 * - Arrow links: the arrow slides forward and the gap widens on hover;
 *   active compresses it back.
 * - Giant CTA link: a red fill wipes up from the bottom on hover and
 *   focus, with the label swapping contrast.
 *
 * Dynamic tilt values flow through custom properties set in handlers;
 * all static styling lives in the CSS module.
 */

const CARDS = [
  {
    label: '01',
    title: 'Music that fits the world.',
    body: "Original compositions built around your game's tone, pacing, and emotional arc. Never stock tracks or temp-music swaps.",
  },
  {
    label: '02',
    title: 'Stems ready for your pipeline.',
    body: 'Stems and loops formatted for Unity, Unreal, or a custom engine, structured so your team can drop them in and adapt.',
  },
  {
    label: '03',
    title: 'Built for indie studios.',
    body: 'Transparent pricing, clear scope, real timelines. No studio overhead, no runaround.',
  },
]

function TiltCard({ label, title, body }) {
  const ref = useRef(null)

  function onMove(e) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    el.style.setProperty('--ry', `${(px - 0.5) * 10}deg`)
    el.style.setProperty('--rx', `${(0.5 - py) * 10}deg`)
    el.style.setProperty('--gx', `${px * 100}%`)
    el.style.setProperty('--gy', `${py * 100}%`)
  }

  function onLeave() {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <div
      ref={ref}
      className={styles.tiltCard}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <span className={styles.tiltGlare} aria-hidden="true" />
      <span className={styles.cardLabel}>{label}</span>
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardBody}>{body}</p>
    </div>
  )
}

export default function ConceptPressureWave() {
  return (
    <div className={styles.page}>

      {/* ── Split hero ─────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowPulse} aria-hidden="true" />
            Vancouver · Original Music for Games
          </p>
          <h1 className={styles.heroTitle}>
            Your game<br />deserves music<br />built for it.
          </h1>
          <p className={styles.heroSub}>
            Your game's soundtrack already exists within the world you built,
            like a sculpture waiting inside a block of stone. Let's uncover it
            together.
          </p>
          <div className={styles.ctaRow}>
            <Link to="/contact" className={`${styles.pressBtn} ${styles.pressPrimary}`}>
              Say Hello
            </Link>
            <Link to="/portfolio" className={styles.arrowLink}>
              View Work
              <span className={styles.arrowGlyph} aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        <div className={styles.heroPanel}>
          <UnicornScene variant="ripple" />
          <div className={styles.panelCard}>
            <p className={styles.panelCaption}>Featured: Rooftops and Alleys</p>
            <video
              controls
              className={styles.panelVideo}
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

      {/* ── Tilt cards ─────────────────────────────────────────── */}
      <section className={styles.cards}>
        <div className="container">
          <p className="section-label">Why Ryan</p>
          <div className={styles.cardGrid}>
            {CARDS.map((card) => (
              <TiltCard key={card.label} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Giant slide-fill CTA ───────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <p className={`section-label ${styles.ctaLabel}`}>Get in Touch</p>
        </div>
        <Link to="/contact" className={styles.giantCta}>
          <span className={styles.giantFill} aria-hidden="true" />
          <span className={styles.giantLabel}>
            Want to work together?
            <span className={styles.giantArrow} aria-hidden="true">&rarr;</span>
          </span>
        </Link>
        <div className="container">
          <p className={styles.ctaNote}>
            Available remotely worldwide. Replies within 24 hours.
          </p>
        </div>
      </section>

    </div>
  )
}
