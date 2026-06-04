import styles from './Home.module.css'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className={styles.page}>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>

          <div className={styles.heroText}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              Vancouver · Sound Design and Original Score for Film
            </p>

            <h1 className={styles.heroTitle}>
              Your film will sound
              as intentional
              as it looks.
            </h1>

            <p className={styles.heroSub}>
              Sound design that feels like it was always part of your film.
              Ryan composes original music and designs sound, so your score
              and your sound world stay tonally cohesive. One collaborator, start to finish.
            </p>

            {/* Compact inline audio player */}
            <div className={styles.inlinePlayer}>
              <span className={styles.inlinePlayerLabel}>Demo Reel 2024</span>
              <audio
                controls
                className={styles.audio}
                preload="metadata"
                aria-label="Ryan O'Rourke demo reel 2024"
              >
                <source src="/audio/demo-reel-2024.mp3" type="audio/mpeg" />
              </audio>
            </div>

            <div className={styles.heroCtas}>
              <Link to="/portfolio" className="btn btn-primary">Hear the Work</Link>
              <Link to="/contact" className="btn btn-outline">Discuss Your Film</Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── Differentiator ──────────────────────────────────── */}
      <section className={styles.diff}>
        <div className="container">
          <div className={styles.diffGrid}>
            {[
              {
                label: '01',
                title: 'Composer and\nsound designer.',
                body: "Ryan writes original music and designs sound — a crossover most productions have to split between two people. When the score and the effects come from the same person, the film sounds like it was always meant to sound that way.",
              },
              {
                label: '02',
                title: 'He listens to\nthe story.',
                body: 'A technically trained engineer with a musician\'s instincts. Ryan approaches every project with emotional intent — building a sonic world that serves the narrative, not just fills the silence.',
              },
              {
                label: '03',
                title: 'Built for indie\nproductions.',
                body: 'Rates are on the page. Ryan works lean — home studio discipline, broadcast-ready deliverables, real-world indie timelines. No studio overhead, no runaround.',
              },
            ].map(({ label, title, body }) => (

              <div key={label} className={styles.diffCard}>
                <span className={styles.diffLabel}>{label}</span>
                <h2 className={styles.diffTitle}>{title}</h2>
                <p className={styles.diffBody}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Work ──────────────────────────────────── */}
      <section className={`section ${styles.work}`}>
        <div className="container">
          <div className={styles.workHeader}>
            <div>
              <p className="section-label">Selected Work</p>
              <h2 className="section-title">Recent Projects</h2>
            </div>
            <Link to="/portfolio" className="btn btn-outline">View Full Portfolio →</Link>
          </div>

          {/* TODO: Replace with live data from usePortfolio(featured=true) */}
          <div className={styles.workGrid}>
            {[
              { cat: 'Sound Design', title: 'Project Title', desc: 'Built the full sonic environment from scratch — every layer designed to deepen the tension of the scene.' },
              { cat: 'Original Score', title: 'Project Title', desc: 'Original score composed and delivered as stems, giving the editor full control over the emotional arc.' },
              { cat: 'Foley & SFX', title: 'Project Title', desc: 'Custom foley recorded to picture, every effect chosen to keep the audience inside the world of the film.' },
            ].map((item) => (
              <article key={item.cat} className={`card ${styles.workCard}`}>
                <div className={styles.workAudio} aria-hidden="true" />
                <div className={styles.workMeta}>
                  <span className={styles.workCat}>{item.cat}</span>
                  <h3 className={styles.workTitle}>{item.title}</h3>
                  <p className={styles.workDesc}>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inquiry CTA ──────────────────────────────── */}
      <section className={styles.masterSection}>
        <div className="container">
          <div className={styles.masterInner}>
            <div className={styles.masterText}>
              <p className={`section-label ${styles.masterLabel}`}>Get in Touch</p>
              <h2 className={styles.masterTitle}>
                Tell me about<br />your project.
              </h2>
              <p className={styles.masterBody}>
                Whether you are in pre-production or already in the edit, it is never too early
                to talk about sound. Describe what you are making and Ryan will get back to you
                within 24 hours.
              </p>
            </div>
            <div className={styles.masterCta}>
              <Link to="/contact" className={`btn btn-primary ${styles.masterBtn}`}>
                Start the Conversation
              </Link>
              <p className={styles.masterNote}>Based in Vancouver. Available remotely across Canada.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social proof placeholder ─────────────────────── */}
      <section className={`section ${styles.proof}`}>
        <div className="container">
          <p className="section-label">Why Ryan</p>
          <div className={styles.proofGrid}>
            {[
              { value: 'Score +\nSound', label: 'Both disciplines, one hire' },
              { value: 'Indie', label: 'Built for your budget' },
              { value: 'Local', label: 'Vancouver-based, remote-ready' },
              { value: '24h', label: 'Response on every inquiry' },
            ].map(({ value, label }) => (
              <div key={label} className={styles.proofStat}>
                <span className={styles.proofValue}>{value}</span>
                <span className={styles.proofLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
