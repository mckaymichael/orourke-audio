import styles from './Home.module.css'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className={styles.page}>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className={styles.hero}>
        {/* Decorative angular light slashes — ref image inspired */}
        <div className={styles.heroSlash}  aria-hidden="true" />
        <div className={styles.heroSlash2} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>

          <div className={styles.heroText}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              Vancouver, BC · Sound Design · Score · Post
            </p>

            <h1 className={styles.heroTitle}>
              Your film will sound<br />
              <span className={styles.heroAccent}>as intentional</span><br />
              as it looks.
            </h1>

            <p className={styles.heroSub}>
              Most sound designers think in effects. Ryan thinks in music.
              Sound design and original score from a single creative voice —
              no handoffs, no tonal drift, no extra vendor to manage.
            </p>

            <div className={styles.heroCtas}>
              <Link to="/portfolio" className="btn btn-primary">Hear the Work</Link>
              <Link to="/contact" className="btn btn-outline">Start a Project</Link>
            </div>

            {/* Free master offer — in hero, above the fold */}
            <div className={styles.freeMaster}>
              <div className={styles.freeMasterBadge}>Free</div>
              <p className={styles.freeMasterText}>
                <strong>Send me one track. I'll master it — no strings attached.</strong>{' '}
                Hear the difference before you commit to anything.{' '}
                <Link to="/contact" className={styles.freeMasterLink}>
                  Claim your free master →
                </Link>
              </p>
            </div>
          </div>

          {/* Demo reel — no clicks required */}
          <div className={styles.heroPlayer}>
            <div className={styles.playerHeader}>
              <span className={styles.playerDot} />
              <span className={styles.playerDot} />
              <span className={styles.playerDot} />
              <span className={styles.playerTitle}>Demo Reel — 2024</span>
            </div>
            <div className={styles.playerBody}>
              <p className={styles.playerLabel}>Ryan O'Rourke Audio</p>
              <audio
                controls
                className={styles.audio}
                preload="metadata"
                aria-label="Ryan O'Rourke demo reel 2024"
              >
                {/* TODO: Replace with real URL from WordPress ACF field */}
                <source src="/audio/demo-reel-2024.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <p className={styles.playerMeta}>
                Sound Design · Foley · Original Score · Mix
              </p>
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
                title: 'One collaborator.\nComplete audio.',
                body: 'Sound design, foley, original score, and final mix — from a single creative voice. No handoffs, no vendor coordination, no tonal inconsistency between the music and the effects.',
              },
              {
                label: '02',
                title: "A musician's ear\nin the mix.",
                body: "Ryan composes original music and designs sound — a rare crossover. When the score and the sound design come from the same person, the film sounds like it was always meant to sound that way.",
              },
              {
                label: '03',
                title: 'Built for indie\nbudgets.',
                body: 'No "call for a quote" games. Rates are on the page. Ryan works lean — home studio discipline, broadcast-ready output, real-world indie timelines. No studio overhead passed on to you.',
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
              { cat: 'Sound Design', title: 'Project Title', desc: 'Complete sonic world built from scratch — atmosphere, tension, and impact.' },
              { cat: 'Original Score', title: 'Project Title', desc: 'Full original music composition delivered as stems for editorial flexibility.' },
              { cat: 'Foley & SFX', title: 'Project Title', desc: 'Original and library-based effects tailored to picture, edited with precision.' },
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

      {/* ── Free Master CTA ──────────────────────────────── */}
      <section className={styles.masterSection}>
        <div className="container">
          <div className={styles.masterInner}>
            <div className={styles.masterText}>
              <p className={`section-label ${styles.masterLabel}`}>Risk-Free</p>
              <h2 className={styles.masterTitle}>
                No Commitments.<br />Just Listen.<br /> First One's On Me.
              </h2>
              <p className={styles.masterBody}>
                Send me any track. I'll return a mastered version — free, no pitch, no invoice,
                no obligation. If it sounds better, we can talk. That's the whole offer.
              </p>
              <p className={styles.masterSubtext}>
                I'm confident enough in the result to do the first one for free.
              </p>
            </div>
            <div className={styles.masterCta}>
              <Link to="/contact" className={`btn btn-primary ${styles.masterBtn}`}>
                Claim Your Free Master
              </Link>
              <p className={styles.masterNote}>No account. No credit card. Just send the track.</p>
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
              { value: '5+', label: 'Audio disciplines' },
              { value: '1', label: 'Point of contact' },
              { value: '$0', label: 'First master' },
              { value: '24h', label: 'Response time' },
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
