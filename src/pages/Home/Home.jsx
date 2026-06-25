import styles from './Home.module.css'
import { Link } from 'react-router-dom'
import WaveStack from '../../components/WaveStack/WaveStack'
import videoThumbnail from '../../images/video-thumbnail.jpg'

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
              Your game's soundtrack already exists within the world you built, like a sculpture waiting inside a block of stone.
              Let's uncover it together, composing music that feels like it was always there, just waiting to be found.
            </p>

            {/* Featured Video Player */}
            <div className={styles.featuredVideoWrapper}>
              <div className={styles.videoOverlay}>
                <h3 className={styles.videoTitle}>
                  Featured: Rooftops and Alleys Videogame Trailer Musical Composition
                </h3>
              </div>
              <video
                controls
                className={styles.featuredVideo}
                preload="metadata"
                poster={videoThumbnail}
                aria-label="Ryan O'Rourke Featured Composition Reel"
              >
                <source src="/video/featured-reel.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
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
                body: "Ryan composes original music, not stock tracks or temp-music swaps. Every piece is built around your game's tone, pacing, and emotional arc. The soundtrack feels inevitable because it was written for your game specifically.",
              },
              {
                label: '02',
                title: 'Stems ready\nfor your pipeline.',
                body: 'Deliverables come as stems and loops formatted for your engine. Whether you are working in Unity, Unreal, or a custom setup, Ryan structures the audio so your team can drop it in and adapt it without extra back-and-forth.',
              },
              {
                label: '03',
                title: 'Built for indie\nstudios.',
                body: 'Transparent pricing, clear scope, real timelines. Ryan works lean and communicates openly, with no studio overhead or runaround. You know what you are getting before the project starts.',
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
                I am looking to connect with studios and developers in the game
                audio world. Whether you have a project, feedback on my work,
                or just want to talk, I will get back to you within 24 hours.
              </p>
            </div>
            <div className={styles.masterCta}>
              <Link to="/contact" className={`btn btn-primary ${styles.masterBtn}`}>
                Say Hello
              </Link>
              <p className={styles.masterNote}>Available remotely worldwide.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
