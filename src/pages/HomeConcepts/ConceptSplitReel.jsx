import styles from './ConceptSplitReel.module.css'
import { Link } from 'react-router-dom'
import videoThumbnail from '../../images/video-thumbnail.jpg'

/**
 * CONCEPT A — "Split Reel"
 *
 * A left/right editorial split instead of the centered hero on the live
 * homepage. Copy is left-aligned and paired against a tilted, framed video
 * "reel" on the right. The differentiator section becomes a connected
 * horizontal filmstrip (numerals as oversized background type) rather than
 * a bordered 3-column grid, and the closing CTA is a single full-bleed
 * centered banner instead of a split light-mode card.
 */
export default function ConceptSplitReel() {
  return (
    <div className={styles.page}>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroSeam} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>

          <div className={styles.heroText}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              Vancouver · Original Music for Games
            </p>

            <h1 className={styles.heroTitle}>
              Your game deserves music built for it.
            </h1>

            <p className={styles.heroSub}>
              Your game's soundtrack already exists within the world you built,
              like a sculpture waiting inside a block of stone. Let's uncover
              it together, composing music that feels like it was always
              there, just waiting to be found.
            </p>

            <div className={styles.heroCtaRow}>
              <Link to="/contact" className="btn btn-primary">Say Hello</Link>
              <Link to="/portfolio" className="btn btn-outline">View Work</Link>
            </div>
          </div>

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
            <p className={styles.reelCaption}>Rooftops and Alleys — Trailer Composition</p>
          </div>

        </div>
      </section>

      {/* ── Differentiator filmstrip ─────────────────────────── */}
      <section className={styles.filmstrip}>
        <div className="container">
          <p className={`section-label ${styles.filmLabel}`}>Why Ryan</p>
          <div className={styles.filmRail}>
            {[
              {
                label: '01',
                title: 'Music that fits the world.',
                body: "Original compositions built around your game's tone, pacing, and emotional arc, never stock tracks or temp-music swaps.",
              },
              {
                label: '02',
                title: 'Stems ready for your pipeline.',
                body: 'Deliverables come as stems and loops formatted for Unity, Unreal, or a custom engine, ready to drop in.',
              },
              {
                label: '03',
                title: 'Built for indie studios.',
                body: 'Transparent pricing, clear scope, real timelines, with no studio overhead or runaround.',
              },
            ].map(({ label, title, body }) => (
              <div key={label} className={styles.filmCard}>
                <span className={styles.filmNumeral} aria-hidden="true">{label}</span>
                <span className={styles.filmLabelSm}>{label}</span>
                <h2 className={styles.filmTitle}>{title}</h2>
                <p className={styles.filmBody}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ──────────────────────────────────────── */}
      <section className={styles.ctaBanner}>
        <div className={`container ${styles.ctaInner}`}>
          <p className={`section-label ${styles.ctaLabel}`}>Get in Touch</p>
          <h2 className={styles.ctaTitle}>Want to work together?</h2>
          <p className={styles.ctaBody}>
            I am looking to connect with studios and developers in the game
            audio world. Whether you have a project, feedback on my work, or
            just want to talk, I will get back to you within 24 hours.
          </p>
          <Link to="/contact" className="btn btn-primary">Say Hello</Link>
          <p className={styles.ctaNote}>Available remotely worldwide.</p>
        </div>
      </section>

    </div>
  )
}
