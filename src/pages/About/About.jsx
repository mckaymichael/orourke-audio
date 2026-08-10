import { PrimaryBtn, SecondaryBtn } from '../../components/Buttons/Buttons.jsx'
import styles from './About.module.css'

export default function About() {
  return (
    <div className={styles.page}>

      {/* ── Full-bleed portrait ─────────────── */}
      <section className={styles.splash}>
        <img
          src="/media/ryan-headshots/For-Web-22.jpg"
          alt="Ryan O'Rourke"
          className={styles.splashImage}
        />
        <div className={styles.splashScrim} aria-hidden="true" />
        <h1 className={styles.splashName}>Ryan O'Rourke</h1>
      </section>

      {/* ── Intro ──────────────────────────── */}
      <section className={`section ${styles.intro}`}>
        <div className="container">
          <div className={styles.introGrid}>
            <div className={styles.introText}>
              <h2 className="section-title">About me</h2>

              <p className={styles.bio}>
                I started learning piano at age 3. I stopped at age 5. I didn't feel like I was getting
                "good enough," at least not in the traditional sense. At age 10 I organically discovered
                electronic music and became absolutely enamoured by the idea that machines, with human
                assistance, could communicate emotion.
              </p>
              <p className={styles.bio}>
                Fast-forward to me at age 14. I had been hooked on trap music for the entirety of my
                early secondary-school years, and I thought, "why can't I do this?" And so I did. Over
                the rest of my high-school years, I taught myself the basic nuances of rhythm and
                composition, but I wanted to take it a step further.
              </p>
              <p className={styles.bio}>
                Upon graduating, I went to LaSalle College Vancouver to fully embrace every aspect of
                music and sound, and so I did. Approximately 6 years post-graduation, I can finally say
                I understand enough of every avenue of music to compete with my peers. I possess an
                undying passion, a feverish obsession, and an insatiable desire for near-perfection.
                And, if you're willing to allow me to try, I shall achieve it. Cheers!
              </p>

              <div className={styles.links}>
                <PrimaryBtn to="/portfolio">Hear the Work</PrimaryBtn>
                <SecondaryBtn to="/contact">Let's Work Together</SecondaryBtn>
              </div>
            </div>

            <div className={styles.photoWrap}>
              <img
                src="/media/ryan-headshots/For-Web-6.jpg"
                alt="Ryan O'Rourke"
                className={styles.photo}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── What I Bring (hidden for now) ────
      <section className={`section ${styles.brings}`}>
        <div className="container">
          <h2 className="section-title">Built on music.<br />Learning games.</h2>

          <div className={styles.bringGrid}>
            {[
              {
                label: 'Composition',
                body: 'Everything is written from scratch. No stock libraries, no shortcuts. I would rather build the sound a project actually needs.',
              },
              {
                label: 'Range',
                body: 'Orchestral, ambient, electronic, hybrid, whatever the brief calls for. I taught myself across genres and I am still doing it.',
              },
              {
                label: 'Collaboration',
                body: 'I take feedback well, I communicate, and I do not go quiet mid-project. Working with me should feel easy.',
              },
              {
                label: 'Work ethic',
                body: 'An undying passion for this, a feverish obsession with getting it right, and an insatiable want for near-perfection. Give me the chance and I will get there.',
              },
            ].map(({ label, body }) => (
              <div key={label} className={styles.bringCard}>
                <span className={`font-mono ${styles.bringLabel}`}>{label}</span>
                <p className={styles.bringBody}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      ──────────────────────────────────── */}

      {/* ── Background ──────────────────────── */}
      <section className={`section ${styles.background}`}>
        <div className="container">
          <div className={styles.bgGrid}>
            <div className={styles.bgPhotoWrap}>
              <img
                src="/media/ryan-headshots/For-Web-20.jpg"
                alt="Ryan O'Rourke"
                className={styles.bgPhoto}
              />
            </div>
            <div>
              <h2 className="section-title">Education and Experience.</h2>
              <p className={styles.bgBody}>
                I went to LaSalle College Vancouver to get a Professional Recording Arts Diploma and to
                understand the craft properly, top to bottom. Since then I have worked as a freelance
                producer and composer, and as a lead audio engineer at Bassunga Entertainment and Mindflow
                Records.
              </p>
              <p className={styles.bgBody}>
                About six years out of school now, and I can finally say I understand enough of every
                avenue of music to stand next to my peers. I have mixed, mastered, and engineered audio
                for independent films, records, and commercial releases, and all of it points at one
                thing: writing music that game development teams can build worlds around.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Get in Touch: full-bleed photo CTA ─────────────────── */}
      <section className={styles.cta}>
        <img
          src="/media/ryan-headshots/For-Web-18.jpg"
          alt="Ryan O'Rourke"
          className={styles.ctaPhoto}
        />
        <div className={styles.ctaScrim} aria-hidden="true" />
        <div className={styles.ctaCenter}>
          <PrimaryBtn to="/contact">Let's Work Together</PrimaryBtn>
        </div>
      </section>

    </div>
  )
}
