import { Link } from 'react-router-dom'
import styles from './ConceptTestSignal.module.css'
import UnicornScene from '../../components/UnicornScene/UnicornScene.jsx'
import videoThumbnail from '../../images/video-thumbnail.jpg'

/**
 * CONCEPT E, "Test Signal"
 *
 * A broadcast control-room aesthetic. The hero pairs a terminal-flavoured
 * headline (with a blinking caret) against a framed "monitor" running the
 * oscilloscope signal shader, complete with a HUD readout. Differentiators
 * are a numbered ledger, the reel plays inside a second monitor frame, and
 * the CTA reads like a transmission sign-off.
 *
 * Interaction feedback explored here:
 * - REC button: an idle status dot starts pulsing on hover, the button
 *   arms with a glow, and active snaps it down like a console switch.
 * - Bracket links: square brackets slide in from both sides on hover
 *   and focus, echoing terminal selection.
 * - Ledger rows: hovering indents the row, ignites the index number,
 *   and draws a left rule, so scanning feels tactile.
 * - Monitor frames: hovering sharpens the frame border and lights the
 *   status LED in the corner chrome.
 */

const LEDGER = [
  {
    label: '01',
    title: 'Music that fits the world.',
    body: "Original compositions built around your game's tone, pacing, and emotional arc. Never stock tracks or temp-music swaps.",
  },
  {
    label: '02',
    title: 'Stems ready for your pipeline.',
    body: 'Stems and loops formatted for Unity, Unreal, or a custom engine, ready for your team to drop in and adapt.',
  },
  {
    label: '03',
    title: 'Built for indie studios.',
    body: 'Transparent pricing, clear scope, real timelines. No studio overhead, no runaround.',
  },
]

function BracketLink({ to, children }) {
  return (
    <Link to={to} className={styles.bracketLink}>
      <span className={styles.bracketL} aria-hidden="true">[</span>
      <span className={styles.bracketLabel}>{children}</span>
      <span className={styles.bracketR} aria-hidden="true">]</span>
    </Link>
  )
}

export default function ConceptTestSignal() {
  return (
    <div className={styles.page}>

      {/* ── Hero: headline + signal monitor ───────────────────── */}
      <section className={`container ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>// Vancouver · Original Music for Games</p>
          <h1 className={styles.heroTitle}>
            Your game deserves music built for it.
            <span className={styles.caret} aria-hidden="true" />
          </h1>
          <p className={styles.heroSub}>
            Your game's soundtrack already exists within the world you built.
            Let's uncover it together.
          </p>
          <div className={styles.heroActions}>
            <Link to="/contact" className={styles.recBtn}>
              <span className={styles.recDot} aria-hidden="true" />
              Say Hello
            </Link>
            <BracketLink to="/portfolio">View Work</BracketLink>
          </div>
        </div>

        <div className={styles.monitor}>
          <div className={styles.monitorChrome}>
            <span className={styles.monitorTitle}>SIG.MONITOR_01</span>
            <span className={styles.monitorLed} aria-hidden="true" />
          </div>
          <div className={styles.monitorScreen}>
            <UnicornScene variant="signal" />
            <div className={styles.hud} aria-hidden="true">
              <span>FREQ 440.0</span>
              <span>GAIN -6dB</span>
              <span>CH A/B</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ledger ────────────────────────────────────────────── */}
      <section className={styles.ledger}>
        <div className="container">
          <p className="section-label">Why Ryan</p>
          <ol className={styles.ledgerList}>
            {LEDGER.map(({ label, title, body }) => (
              <li key={label} className={styles.ledgerRow}>
                <span className={styles.ledgerIndex} aria-hidden="true">{label}</span>
                <div>
                  <h2 className={styles.ledgerTitle}>{title}</h2>
                  <p className={styles.ledgerBody}>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Reel monitor ──────────────────────────────────────── */}
      <section className={`container ${styles.reel}`}>
        <div className={styles.monitor}>
          <div className={styles.monitorChrome}>
            <span className={styles.monitorTitle}>PLAYBACK // Rooftops and Alleys</span>
            <span className={styles.monitorLed} aria-hidden="true" />
          </div>
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
      </section>

      {/* ── Sign-off CTA ──────────────────────────────────────── */}
      <section className={styles.signoff}>
        <div className={`container ${styles.signoffInner}`}>
          <p className={styles.signoffLine} aria-hidden="true">
            ····· END OF TRANSMISSION ·····
          </p>
          <h2 className={styles.signoffTitle}>Want to work together?</h2>
          <p className={styles.signoffBody}>
            I am looking to connect with studios and developers in the game
            audio world. I will get back to you within 24 hours.
          </p>
          <div className={styles.signoffActions}>
            <Link to="/contact" className={styles.recBtn}>
              <span className={styles.recDot} aria-hidden="true" />
              Open Channel
            </Link>
            <BracketLink to="/about">About Ryan</BracketLink>
          </div>
          <p className={styles.signoffNote}>Available remotely worldwide.</p>
        </div>
      </section>

    </div>
  )
}
