import styles from './ConceptSessionDeck.module.css'
import { Link } from 'react-router-dom'
import videoThumbnail from '../../images/video-thumbnail.jpg'

// Deterministic bar heights (%) for the decorative meter — no randomness so
// the layout renders identically on every load.
const METER_BARS = [38, 62, 45, 80, 55, 90, 48, 70, 35, 65, 50, 85]

const TRACKS = [
  {
    label: '01',
    title: 'Music that fits the world.',
    body: "Original compositions built around your game's tone, pacing, and emotional arc, never stock tracks or temp-music swaps.",
    bars: [40, 70, 55, 85, 60],
  },
  {
    label: '02',
    title: 'Stems ready for your pipeline.',
    body: 'Deliverables come as stems and loops formatted for Unity, Unreal, or a custom engine, ready to drop in.',
    bars: [65, 45, 80, 50, 75],
  },
  {
    label: '03',
    title: 'Built for indie studios.',
    body: 'Transparent pricing, clear scope, real timelines, with no studio overhead or runaround.',
    bars: [50, 90, 40, 65, 55],
  },
]

/**
 * CONCEPT B — "Session Deck"
 *
 * Borrows the visual language of a DAW / mixing console instead of a
 * marketing hero: a session-file header bar, an animated channel meter,
 * a compact "track row" video clip, and differentiators presented as a
 * vertical mixer channel list rather than a card grid. The closing CTA
 * drops the split banner for a minimal "record" block built around the
 * same pulsing-dot motif used in the live site's eyebrow, scaled up.
 */
export default function ConceptSessionDeck() {
  return (
    <div className={styles.page}>

      {/* ── Session header / hero ─────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.sessionBar}>
          <span>SESSION // original_score.wav</span>
          <span className={styles.sessionTime}>00:00:00:00</span>
        </div>

        <div className="container">
          <div className={styles.heroGrid}>

            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>
                <span>Your game</span>
                <span>deserves music</span>
                <span className={styles.heroTitleAccent}>built for it.</span>
              </h1>

              <p className={styles.heroSub}>
                Your game's soundtrack already exists within the world you
                built, like a sculpture waiting inside a block of stone.
                Let's uncover it together, composing music that feels like
                it was always there, just waiting to be found.
              </p>

              <div className={styles.heroCtaRow}>
                <Link to="/contact" className="btn btn-primary">Say Hello</Link>
                <Link to="/portfolio" className="btn btn-outline">View Work</Link>
              </div>
            </div>

            <div className={styles.meter} aria-hidden="true">
              {METER_BARS.map((h, i) => (
                <span
                  key={i}
                  className={styles.meterBar}
                  style={{ '--h': `${h}%`, animationDelay: `${i * 0.12}s` }}
                />
              ))}
            </div>

          </div>

          {/* ── Track row: featured video clip ── */}
          <div className={styles.clipRow}>
            <span className={styles.clipLabel}>FEATURED CLIP</span>
            <div className={styles.clipTrack}>
              <video
                controls
                className={styles.clipVideo}
                preload="metadata"
                poster={videoThumbnail}
                aria-label="Ryan O'Rourke Featured Composition Reel"
              >
                <source src="/video/featured-reel.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <span className={styles.clipName}>Rooftops and Alleys — Trailer Composition</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Differentiators as a mixer channel list ─────────── */}
      <section className={styles.channels}>
        <div className="container">
          <p className={`section-label ${styles.channelsLabel}`}>Why Ryan // Channel Strip</p>

          <div className={styles.channelList}>
            {TRACKS.map(({ label, title, body, bars }) => (
              <div key={label} className={styles.channelRow}>
                <span className={styles.channelNumeral}>{label}</span>
                <div className={styles.channelText}>
                  <h2 className={styles.channelTitle}>{title}</h2>
                  <p className={styles.channelBody}>{body}</p>
                </div>
                <div className={styles.channelMeter} aria-hidden="true">
                  {bars.map((h, i) => (
                    <span
                      key={i}
                      className={styles.channelBar}
                      style={{ '--h': `${h}%`, animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Record CTA ────────────────────────────────────── */}
      <section className={styles.record}>
        <div className={`container ${styles.recordInner}`}>
          <span className={styles.recordDot} aria-hidden="true" />
          <p className={styles.recordLabel}>Get In Touch</p>
          <h2 className={styles.recordTitle}>Want to work together?</h2>
          <p className={styles.recordBody}>
            I am looking to connect with studios and developers in the game
            audio world. Whether you have a project, feedback on my work, or
            just want to talk, I will get back to you within 24 hours.
          </p>
          <Link to="/contact" className="btn btn-primary">Say Hello</Link>
          <p className={styles.recordStatus}>Status: Available — remote worldwide.</p>
        </div>
      </section>

    </div>
  )
}
