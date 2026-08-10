import { useRef, useState } from 'react'
import styles from './Home.module.css'
import UnicornScene from '../../components/UnicornScene/UnicornScene.jsx'
import { PrimaryBtn, SecondaryBtn } from '../../components/Buttons/Buttons.jsx'

// Direct link to the hero reel video, set in .env as VITE_HERO_VIDEO_URL
// (e.g. the file URL copied straight from the WP Media Library). No
// filename convention to follow — just paste the link and it plays.
const HERO_VIDEO_URL = import.meta.env.VITE_HERO_VIDEO_URL || null

/**
 * HOME
 *
 * Assembled from the approved lab directions:
 * - Concept A (Split Reel) hero: left copy against a framed video reel,
 *   with the video column widened, on the smoke shader background, plus
 *   the Concept C scroll indicator.
 * - Approved buttons: dual-wipe red primary, bracket secondary.
 * - Full-bleed photo "Get in Touch" CTA.
 */

export default function Home() {
  const heroVideoRef = useRef(null)
  const [heroVideoPlaying, setHeroVideoPlaying] = useState(false)

  function toggleHeroVideo() {
    const el = heroVideoRef.current
    if (!el) return
    if (el.paused) el.play()
    else el.pause()
  }

  return (
    <div className={styles.page}>

      {/* ── Hero: Split Reel on the smoke shader ─────────────── */}
      <section className={styles.hero}>
        <UnicornScene variant="emberFlow" />
        <div className={styles.heroScrim} aria-hidden="true" />
        <div className={`${styles.heroContainer}`}>

          <div className={styles.heroInner}>

          <div className={styles.heroLeft}>

            <h1 className={styles.heroTitle}>
              Your Game Deserves<br/>Music Built For It.
            </h1>

            <p className={styles.heroSub}>
              Video game composing is about letting people fall in love with your game. With nearly 10 years of composing under my belt, I can build you a soundtrack for your video game that truly immerses your gamers into an unforgettable experience.
            </p>

            <div className={styles.heroCtaRow}>
              <PrimaryBtn to="/contact">Let's Work Together</PrimaryBtn>
              <SecondaryBtn to="/portfolio">View My Work</SecondaryBtn>
            </div>

            <div className={styles.scrollHint} aria-hidden="true">
              <span className={styles.scrollDot} />
            </div>

          </div>

          <div className={styles.heroRight}>

            <div className={styles.heroReel}>
              <span className={styles.reelChip}>Featured Reel</span>
              <div className={styles.reelFrame}>
                {HERO_VIDEO_URL && (
                  <>
                    <video
                      ref={heroVideoRef}
                      controls
                      className={styles.reelVideo}
                      preload="metadata"
                      poster="/media/OTXO-Re-Composition.jpg"
                      aria-label="Ryan O'Rourke Featured Composition Reel"
                      onPlay={() => setHeroVideoPlaying(true)}
                      onPause={() => setHeroVideoPlaying(false)}
                    >
                      <source src={HERO_VIDEO_URL} type="video/mp4" />
                    </video>
                    <button
                      type="button"
                      className={`${styles.reelPlayBtn} ${heroVideoPlaying ? styles.reelPlayBtnPlaying : ''}`}
                      onClick={toggleHeroVideo}
                      aria-label={heroVideoPlaying ? 'Pause featured reel' : 'Play featured reel'}
                    >
                      <span aria-hidden="true">{heroVideoPlaying ? '❚❚' : '►'}</span>
                    </button>
                  </>
                )}
                {!HERO_VIDEO_URL && (
                  <img
                    src="/media/OTXO-Re-Composition.jpg"
                    className={styles.reelVideo}
                    alt="Ryan O'Rourke Featured Composition Reel"
                  />
                )}
              </div>
              <p className={styles.reelCaption}>Game footage shown for demonstration purposes only.</p>
            </div>

          </div>

          </div>

        </div>
      </section>

      {/* ── Meet Ryan: photo + blurb ──────────────────────────── */}
      <section className={styles.meetSection}>
        <div className="container">
          <div className={styles.meetGrid}>
            <div className={styles.meetText}>
              <h2 className={styles.meetTitle}>A Bit About Me</h2>
              <p className={styles.meetBody}>
                I started on piano at three, quit at five, and got hooked on electronic music at ten
                because the idea that a machine could still make you feel something floored me. By
                fourteen I was deep in trap music and taught myself the rest from there. Now I write
                scores for games, chasing the same thing I always have: an undying passion for getting
                it right.
              </p>
              <SecondaryBtn to="/about">More About Me</SecondaryBtn>
            </div>

            <div className={styles.meetPhotoWrap}>
              <img
                src="/media/ryan-headshots/For-Web-7.jpg"
                alt="Ryan O'Rourke"
                className={styles.meetPhoto}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Get in Touch: full-bleed photo CTA ─────────────────── */}
      <section className={styles.ctaSection}>
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
