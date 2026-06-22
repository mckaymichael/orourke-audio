import { Link } from 'react-router-dom'
import styles from './About.module.css'

export default function About() {
  return (
    <div className={styles.page}>

      {/* ── Intro ──────────────────────────── */}
      <section className={`section ${styles.intro}`}>
        <div className="container">
          <div className={styles.introGrid}>
            <div className={styles.introText}>
              <p className="section-label">About</p>
              <h1 className={styles.name}>Ryan O'Rourke</h1>
              <p className={styles.role}>Composer. Vancouver, BC.</p>

              <p className={styles.bio}>
                Ryan makes music. He has been doing it for years — production,
                composition, arrangement — and he is now focused on bringing that
                into games.
              </p>
              <p className={styles.bio}>
                His background is in music, not sound engineering, which means he
                thinks in terms of feel, tension, and emotional arc rather than
                technical checklists. He writes music that fits the world it lives in.
              </p>
              <p className={styles.bio}>
                He trained at LaSalle College Vancouver and has been working on his
                craft ever since. He is early in his game audio career, he knows it,
                and he is actively looking to be around people who can help him grow.
              </p>

              <div className={styles.links}>
                <Link to="/portfolio" className="btn btn-primary">Hear the Work</Link>
                <Link to="/contact" className="btn btn-outline">Get in Touch</Link>
              </div>
            </div>

            {/* Photo placeholder */}
            <div className={styles.photoWrap}>
              <div className={styles.photo} aria-hidden="true" />
              <p className={styles.photoCaption}>Photo coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What he brings ──────────────────── */}
      <section className={`section ${styles.brings}`}>
        <div className="container">
          <p className="section-label">What He Brings</p>
          <h2 className="section-title">Built on music.<br />Learning games.</h2>

          <div className={styles.bringGrid}>
            {[
              {
                label: 'Composition',
                body: 'Original music across a wide range of moods and genres. He writes from scratch for every project and does not reach for stock libraries.',
              },
              {
                label: 'Range',
                body: 'Orchestral, ambient, electronic, hybrid. He is comfortable moving across styles and is used to adapting to a brief.',
              },
              {
                label: 'Collaboration',
                body: 'He takes feedback well, communicates clearly, and does not disappear mid-project. Working with him is low-friction.',
              },
              {
                label: 'Work ethic',
                body: 'He is actively building. If there is something he does not know yet, he is the kind of person who goes and learns it.',
              },
            ].map(({ label, body }) => (
              <div key={label} className={`card ${styles.bringCard}`}>
                <span className={`font-mono ${styles.bringLabel}`}>{label}</span>
                <p className={styles.bringBody}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Background ──────────────────────── */}
      <section className={`section ${styles.background}`}>
        <div className="container">
          <div className={styles.bgGrid}>
            <div>
              <p className="section-label">Background</p>
              <h2 className="section-title">Where he comes from.</h2>
              <p className={styles.bgBody}>
                Ryan studied at LaSalle College Vancouver, where he built his
                foundation in music production and audio. He has spent the time since
                developing his composition skills and getting serious about game audio.
              </p>
              <p className={styles.bgBody}>
                He is not pretending to have shipped titles he has not shipped. What
                he has is strong musical instincts, a genuine interest in games, and
                the drive to put himself in rooms where he can learn from people who
                have been doing this longer than he has.
              </p>
            </div>
            <div className={styles.facts}>
              {[
                { label: 'Education', value: 'LaSalle College Vancouver' },
                { label: 'Focus', value: 'Game Composition' },
                { label: 'Based', value: 'Vancouver, BC' },
                { label: 'Available', value: 'Remote worldwide' },
              ].map(({ label, value }) => (
                <div key={label} className={styles.fact}>
                  <span className={`font-mono ${styles.factLabel}`}>{label}</span>
                  <span className={styles.factValue}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────── */}
      <section className={`section ${styles.cta}`}>
        <div className="container">
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Want to talk?</h2>
            <p className={styles.ctaBody}>
              Whether you want to give feedback on his work, talk about a project,
              or just connect — Ryan is easy to reach and quick to respond.
            </p>
            <Link to="/contact" className="btn btn-primary">Say Hello</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
