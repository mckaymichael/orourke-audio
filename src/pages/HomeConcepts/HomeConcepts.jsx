import { useEffect } from 'react'
import styles from './HomeConcepts.module.css'
import ConceptSplitReel from './ConceptSplitReel.jsx'
import ConceptSessionDeck from './ConceptSessionDeck.jsx'
import ConceptEmberField from './ConceptEmberField.jsx'
import ConceptPressureWave from './ConceptPressureWave.jsx'
import ConceptTestSignal from './ConceptTestSignal.jsx'

/**
 * HIDDEN PAGE: Homepage layout concepts.
 *
 * Not linked from Nav, Footer, or BottomNav. Reachable only by direct URL
 * (/lab/home-concepts). Marked noindex so it never surfaces in search.
 * Renders two structurally distinct homepage layout candidates back to
 * back for side-by-side review. Copy is pulled from the live homepage;
 * only composition and visual treatment change between concepts.
 */
export default function HomeConcepts() {
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Homepage Concepts (Internal) | O’Rourke Audio'

    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)

    return () => {
      document.title = prevTitle
      document.head.removeChild(meta)
    }
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.notice}>
        Internal review page. Not linked in navigation, not indexed.
      </div>

      <div className={styles.divider}>
        <span className={styles.dividerTag}>Concept A</span>
        <h2 className={styles.dividerTitle}>Split Reel</h2>
        <p className={styles.dividerDesc}>
          Left/right editorial hero with a tilted video frame, a connected
          horizontal filmstrip in place of the card grid, and a single
          full-bleed closing CTA banner.
        </p>
      </div>
      <ConceptSplitReel />

      <div className={styles.divider}>
        <span className={styles.dividerTag}>Concept B</span>
        <h2 className={styles.dividerTitle}>Session Deck</h2>
        <p className={styles.dividerDesc}>
          DAW / mixing-console inspired: a session header bar, an animated
          channel meter, a track-row video clip, and differentiators laid
          out as a mixer channel strip.
        </p>
      </div>
      <ConceptSessionDeck />

      <div className={styles.divider}>
        <span className={styles.dividerTag}>Concept C</span>
        <h2 className={styles.dividerTitle}>Ember Field</h2>
        <p className={styles.dividerDesc}>
          Cinematic full-viewport hero with type set directly on a molten
          ember shader. Magnetic CTA buttons with click ripples, an
          interactive accordion for the differentiators, and a floating
          reel card. Shader backgrounds accept a Unicorn Studio project ID
          to swap in a published scene.
        </p>
      </div>
      <ConceptEmberField />

      <div className={styles.divider}>
        <span className={styles.dividerTag}>Concept D</span>
        <h2 className={styles.dividerTitle}>Pressure Wave</h2>
        <p className={styles.dividerDesc}>
          Asymmetric split hero with a full-height ripple shader panel,
          waves radiating toward the cursor like sound pressure. 3D tilt
          cards with a moving glare, mechanical press-down buttons, and a
          giant slide-fill CTA link.
        </p>
      </div>
      <ConceptPressureWave />

      <div className={styles.divider}>
        <span className={styles.dividerTag}>Concept E</span>
        <h2 className={styles.dividerTitle}>Test Signal</h2>
        <p className={styles.dividerDesc}>
          Broadcast control-room aesthetic: an oscilloscope signal shader
          inside a monitor frame, terminal bracket links, a REC-style arm
          button, and a hover-reactive numbered ledger, closing on a
          transmission sign-off.
        </p>
      </div>
      <ConceptTestSignal />
    </div>
  )
}
