import { useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'
import UnicornScene from '../../components/UnicornScene/UnicornScene.jsx'
import { PrimaryBtn, SecondaryBtn } from '../../components/Buttons/Buttons.jsx'
import videoThumbnail from '../../images/video-thumbnail.jpg'

/**
 * HOME
 *
 * Assembled from the approved lab directions:
 * - Concept A (Split Reel) hero: left copy against a framed video reel,
 *   with the video column widened, on the smoke shader background, plus
 *   the Concept C scroll indicator.
 * - Approved buttons: dual-wipe red primary, bracket secondary.
 * - Concept D "Why Ryan": 3D tilt cards with a pointer-tracking glare.
 * - Concept D "Get in Touch": full-width CTA link, red by default, with
 *   the primary button's dual wipe (black, then red) on hover.
 */

const WHY_CARDS = [
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

export default function Home() {
  return (
    <div className={styles.page}>

      {/* ── Hero: Split Reel on the smoke shader ─────────────── */}
      <section className={styles.hero}>
        <UnicornScene variant="emberFlow" />
        <div className={styles.heroScrim} aria-hidden="true" />
        <div className={`${styles.heroContainer}`}>

          <h1 className={styles.heroTitle}>
            Your Game Deserves<br/>Music Built For It.
          </h1>

          <div className={styles.heroInner}>

          <div className={styles.heroLeft}>

            <div className={styles.heroReel}>
              <span className={styles.reelChip}>Featured Reel</span>
              <div className={styles.reelFrame}>
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
              <p className={styles.reelCaption}>Rooftops and Alleys · Trailer Composition</p>
            </div>

          </div>

          <div className={styles.heroRight}>

            <p className={styles.heroSub}>
              I compose high-impact soundtracks across rock, orchestral, and electronic genres. Tailored to fit your gameplay mechanics, seamlessly loop-able, and mixed to professional industry standards.
            </p>

            <dl className={styles.heroKeywords}>
              <div className={styles.keywordRow}>
                <dt>Focus</dt>
                <dd>Video Game Composing</dd>
              </div>
              <div className={styles.keywordRow}>
                <dt>Contact</dt>
                <dd>ryanorourke@gmail.com</dd>
              </div>
              <div className={styles.keywordRow}>
                <dt>Availability</dt>
                <dd>Vancouver, BC or Remote</dd>
              </div>
            </dl>

            <div className={styles.heroCtaRow}>
              <PrimaryBtn to="/contact">Contact Me</PrimaryBtn>
              <SecondaryBtn to="/portfolio">View My Work</SecondaryBtn>
            </div>
          </div>

          </div>

        </div>

        <div className={styles.scrollHint} aria-hidden="true">
          <span className={styles.scrollDot} />
        </div>
      </section>

      {/* ── Why Ryan: tilt cards ─────────────────────────────── */}
      <section className={styles.why}>
        <div className="container">
          <div className={styles.cardGrid}>
            {WHY_CARDS.map((card) => (
              <TiltCard key={card.label} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Get in Touch: red dual-wipe CTA ──────────────────── */}
      <section className={styles.ctaSection}>
        <Link to="/contact" className={styles.giantCta}>
          <span className={`${styles.giantWipe} ${styles.giantWipeBlack}`} aria-hidden="true" />
          <span className={`${styles.giantWipe} ${styles.giantWipeRed}`} aria-hidden="true" />
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
