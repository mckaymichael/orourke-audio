import styles from './Home.module.css'
import { Link } from 'react-router-dom'
import WaveStack from '../../components/WaveStack/WaveStack'

export default function Home() {
  return (
    <div className={styles.page}>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <WaveStack />
        <div className={`container ${styles.heroInner}`}>

          <div className={styles.heroText}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              Vancouver · Original Music for Games
            </p>

            <h1 className={styles.heroTitle}>
              Your game deserves<br />
              music built for it.
            </h1>

            <p className={styles.heroSub}>
              Original soundtracks, adaptive stems, and main themes composed
              specifically for your game. Ryan brings a musician's instincts to
              every project — music that feels like it grew out of the world you built.
            </p>

            {/* Compact inline audio player */}
            <div className={styles.inlinePlayer}>
              <span className={styles.inlinePlayerLabel}>Composition Reel 2024</span>
              <audio
                controls
                className={styles.audio}
                preload="metadata"
                aria-label="Ryan O'Rourke composition reel 2024"
              >
                <source src="/audio/demo-reel-2024.mp3" type="audio/mpeg" />
              </audio>
            </div>

            <div className={styles.heroCtas}>
              <Link to="/portfolio" className="btn btn-primary">Hear the Work</Link>
              <Link to="/about" className="btn btn-outline">About Ryan</Link>
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
                title: 'Music that fits\nthe world.',
                body: "Ryan composes original music — not stock tracks, not temp-music swaps. Every piece is built around your game's tone, pacing, and emotional arc. The soundtrack feels inevitable because it was written for your game specifically.",
              },
              {
                label: '02',
                title: 'Stems ready\nfor your pipeline.',
                body: 'Deliverables come as stems and loops formatted for your engine. Whether you are working in Unity, Unreal, or a custom setup, Ryan structures the audio so your team can drop it in and adapt it without extra back-and-forth.',
              },
              {
                label: '03',
                title: 'Built for indie\nstudios.',
                body: 'Transparent pricing, clear scope, real timelines. Ryan works lean and communicates openly — no studio overhead, no runaround. You know what you are getting before the project starts.',
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
              <h2 className="section-title">Recent Compositions</h2>
            </div>
            <Link to="/portfolio" className="btn btn-outline">View Full Portfolio →</Link>
          </div>

          {/* TODO: Replace with live data from usePortfolio(featured=true) */}
          <div className={styles.workGrid}>
            {[
              { cat: 'Main Theme', title: 'Project Title', desc: 'Composed a main theme that sets the emotional tone from the first screen — with a motif that carries through the full soundtrack.' },
              { cat: 'Ambient Loops', title: 'Project Title', desc: 'Seamlessly looping ambient tracks for exploration areas, each one shaped to the visual mood of the zone.' },
              { cat: 'Original Soundtrack', title: 'Project Title', desc: 'Full OST composed and delivered as stems — giving the team flexibility to layer and adapt the music as the game evolved.' },
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
                Want to work<br />together?
              </h2>
              <p className={styles.masterBody}>
                Ryan is looking to connect with studios and people in the game
                audio world. Whether you have a project, feedback on his work,
                or just want to talk — he will get back to you within 24 hours.
              </p>
            </div>
            <div className={styles.masterCta}>
              <Link to="/contact" className={`btn btn-primary ${styles.masterBtn}`}>
                Say Hello
              </Link>
              <p className={styles.masterNote}>Based in Vancouver. Available remotely worldwide.</p>
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
              { value: 'Original', label: 'Written for your game, not licensed' },
              { value: 'Stems', label: 'Implementation-ready deliverables' },
              { value: 'Remote', label: 'Vancouver-based, available worldwide' },
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
