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
              <h1 className={styles.name}>Ryan O'Rourke</h1>
              <p className={styles.role}>Composer for Games</p>

              <p className={styles.bio}>
                I make music and design sound. I have been producing, composing, and engineering audio
                for nearly a decade, working across game sound, film post-production, and commercial music.
              </p>
              <p className={styles.bio}>
                My background merges music production and audio engineering, meaning I bring a strong musical ear
                alongside technical grounding. I think in terms of feel, tension, and emotional arc, and I construct
                assets that drop seamlessly into developer pipelines.
              </p>
              <p className={styles.bio}>
                I graduated with a Professional Recording Arts Diploma from LaSalle College Vancouver. With a solid foundation
                in mixing, mastering, and sound design, I am focused on creating interactive, immersive soundtracks for games.
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

      {/* ── What I Bring ──────────────────── */}
      <section className={`section ${styles.brings}`}>
        <div className="container">
          <h2 className="section-title">Built on music.<br />Learning games.</h2>

          <div className={styles.bringGrid}>
            {[
              {
                label: 'Composition',
                body: 'Original music across a wide range of moods and genres. I write from scratch for every project and do not reach for stock libraries.',
              },
              {
                label: 'Range',
                body: 'Orchestral, ambient, electronic, hybrid. I am comfortable moving across styles and am used to adapting to a brief.',
              },
              {
                label: 'Collaboration',
                body: 'I take feedback well, communicate clearly, and do not disappear mid-project. Working with me is low-friction.',
              },
              {
                label: 'Work ethic',
                body: 'I am actively building. If there is something I do not know yet, I go and learn it.',
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

      {/* ── Background ──────────────────────── */}
      <section className={`section ${styles.background}`}>
        <div className="container">
          <div className={styles.bgGrid}>
            <div>
              <h2 className="section-title">Where I come from.</h2>
              <p className={styles.bgBody}>
                I graduated with a Professional Recording Arts Diploma from LaSalle College Vancouver, where I built a deep
                foundation in recording technology and production. Since then, I have spent years as a freelance producer and composer,
                as well as a lead audio engineer at Bassunga Entertainment and Mindflow Records.
              </p>
              <p className={styles.bgBody}>
                Over the last eight years, I have mixed, mastered, and engineered audio for independent films, records, and commercial releases. 
                I bring strong sonic instincts, hands-on industry experience, and the technical vocabulary needed to collaborate effectively 
                with development teams.
              </p>
            </div>
            <div className={styles.facts}>
              {[
                { label: 'Education', value: 'LaSalle College Vancouver' },
                { label: 'Focus', value: 'Game Composition' },
                { label: 'Availability', value: 'Available worldwide' },
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

      {/* ── Vancouver ───────────────────────── */}
      <section className={`section ${styles.vancouver}`}>
        <div className="container">
          <div className={styles.vancouverHeader}>
            <h2 className={styles.vancouverTitle}>Inspired by the Pacific Northwest</h2>
            <p className={styles.vancouverBody}>
              Vancouver is more than just where I live; it is a constant source of inspiration. 
              The contrast between the quiet, mossy forests of the North Shore and the high-energy city streets 
              shapes how I think about texture, space, and contrast in my music. 
              Whether I am capturing field recordings in the rainforest, walking the downtown skyline, 
              or listening to live shows in our local music venues, the unique pulse of the Pacific Northwest 
              is embedded in every track I compose.
            </p>
          </div>
          <div className={styles.vancouverGallery}>
            <div className={styles.vancouverImgWrap}>
              <img 
                src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80" 
                className={styles.vancouverImg} 
                alt="Foggy Pacific Northwest forest trees" 
              />
              <span className={styles.vancouverCaption}>Forests</span>
            </div>
            <div className={styles.vancouverImgWrap}>
              <img 
                src="https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&w=800&q=80" 
                className={styles.vancouverImg} 
                alt="Vancouver downtown cityscape skyline" 
              />
              <span className={styles.vancouverCaption}>Cityscape</span>
            </div>
            <div className={styles.vancouverImgWrap}>
              <img 
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80" 
                className={styles.vancouverImg} 
                alt="Live concert crowd and stage lights" 
              />
              <span className={styles.vancouverCaption}>Music Scene</span>
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
              Whether you want to give feedback on my work, talk about a project,
              or just connect, I am easy to reach and quick to respond.
            </p>
            <Link to="/contact" className="btn btn-primary">Say Hello</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
