import { useEffect } from 'react'
import styles from './PortfolioConcepts.module.css'

import ConceptWaveformTimeline from './ConceptWaveformTimeline.jsx'
import ConceptRecordWall from './ConceptRecordWall.jsx'
import ConceptMixerConsole from './ConceptMixerConsole.jsx'
import ConceptPosterPlaylist from './ConceptPosterPlaylist.jsx'
import ConceptOrbitPlayer from './ConceptOrbitPlayer.jsx'
import ConceptScrollScenes from './ConceptScrollScenes.jsx'
import ConceptTapeLibrary from './ConceptTapeLibrary.jsx'
import ConceptDiagonalSetlist from './ConceptDiagonalSetlist.jsx'
import ConceptSwipeDeck from './ConceptSwipeDeck.jsx'
import ConceptSignalHUD from './ConceptSignalHUD.jsx'

/**
 * HIDDEN PAGE: Portfolio layout concepts.
 *
 * Not linked from Nav, Footer, or BottomNav. Reachable only by direct URL
 * (/lab/portfolio-concepts). Marked noindex so it never surfaces in search.
 *
 * Purpose: explore ways to BLEND the "feature reel video list" and the
 * "compact soundtrack list" into a single, more interactive and memorable
 * space — instead of stacking three separate, progressively-plainer lists.
 * Ten structurally distinct layouts are rendered back-to-back for review.
 * Track/video content is shared placeholder data (see labMedia.js); only the
 * composition and interaction model change between concepts.
 */

const CONCEPTS = [
  {
    tag: 'Concept 01',
    title: 'Waveform Timeline',
    desc: 'One continuous waveform runs the width of the section. The feature video sits above it; each soundtrack is a chapter marker pinned along the wave. Scrubbing the timeline swaps the active track — the reel and the list become one instrument.',
    Component: ConceptWaveformTimeline,
  },
  {
    tag: 'Concept 02',
    title: 'Record Wall',
    desc: 'A wall of vinyl sleeves. Pick a sleeve and the black record slides out into a spinning "now playing" turntable, while the matching video docks as the centrepiece. Browsing feels like flipping through a crate.',
    Component: ConceptRecordWall,
  },
  {
    tag: 'Concept 03',
    title: 'Mixer Console',
    desc: 'A DAW-style split: the video monitor on the left, the soundtrack list as a channel-strip rack on the right. Every track is a fader row with a live level meter; arming a channel loads it into the monitor.',
    Component: ConceptMixerConsole,
  },
  {
    tag: 'Concept 04',
    title: 'Poster → Playlist',
    desc: 'The "gets more compact" instinct made interactive. A density toggle morphs the same works between big cinematic poster cards (Cinema) and a tight numbered tracklist (Setlist) — one content set, two viewing modes.',
    Component: ConceptPosterPlaylist,
  },
  {
    tag: 'Concept 05',
    title: 'Orbit Player',
    desc: 'A radial layout: the feature video is a disc at the centre, soundtracks orbit it as satellites on concentric rings. Clicking a satellite docks it and reveals its detail — spatial instead of a vertical list.',
    Component: ConceptOrbitPlayer,
  },
  {
    tag: 'Concept 06',
    title: 'Scroll Scenes',
    desc: 'Scrollytelling. Full-width scene panels scroll past while a sticky "now playing" bar pins to the bottom and re-tunes itself to whichever scene is on screen — the video reel drives the soundtrack list automatically.',
    Component: ConceptScrollScenes,
  },
  {
    tag: 'Concept 07',
    title: 'Tape Library',
    desc: 'A skeuomorphic cassette shelf. Each soundtrack is a labelled tape; slotting one into the deck at the top spins the reels and lights the small monitor beside it. Tactile, collectible, memorable.',
    Component: ConceptTapeLibrary,
  },
  {
    tag: 'Concept 08',
    title: 'Diagonal Setlist',
    desc: 'A hard diagonal split. The feature video fills the upper triangle; a numbered "setlist" ledger fills the lower one. Hovering a setlist row tints the video side and cross-highlights, tying the two halves together.',
    Component: ConceptDiagonalSetlist,
  },
  {
    tag: 'Concept 09',
    title: 'Swipe Deck',
    desc: 'A stacked card deck. The front card is the current track with a looping video thumbnail and player; next/previous shuffles the stack with a 3D flick. The silhouette of remaining cards shows how deep the catalogue runs.',
    Component: ConceptSwipeDeck,
  },
  {
    tag: 'Concept 10',
    title: 'Signal HUD',
    desc: 'A broadcast control-room readout. A scanline video monitor on the left, a terminal-style tracklist log on the right with live signal-strength bars and a blinking cursor. Select a line and it "tunes in" on the monitor.',
    Component: ConceptSignalHUD,
  },
]

export default function PortfolioConcepts() {
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Portfolio Concepts (Internal) | O’Rourke Audio'

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
        Internal review page · Not linked in navigation · Not indexed
      </div>

      <header className={styles.intro}>
        <p className={styles.introKicker}>Portfolio · Layout Studies</p>
        <h1 className={styles.introTitle}>Blending the reel and the list</h1>
        <p className={styles.introBody}>
          Ten ways to fuse the feature-reel video showcase and the compact
          soundtrack list into a single interactive space, so the work never
          flattens into three progressively plainer lists. Same placeholder
          content throughout; only the composition and interaction change.
        </p>
      </header>

      {CONCEPTS.map(({ tag, title, desc, Component }) => (
        <section key={tag} className={styles.block}>
          <div className={styles.divider}>
            <span className={styles.dividerTag}>{tag}</span>
            <h2 className={styles.dividerTitle}>{title}</h2>
            <p className={styles.dividerDesc}>{desc}</p>
          </div>
          <Component />
        </section>
      ))}

      <footer className={styles.outro}>
        End of concepts · {CONCEPTS.length} layouts
      </footer>
    </div>
  )
}
