import { useState } from 'react'
import styles from './FeatureStudies.module.css'
import UnicornScene from '../../components/UnicornScene/UnicornScene.jsx'
import { PrimaryBtn, SecondaryBtn } from './LabButtons.jsx'
import videoThumbnail from '../../images/video-thumbnail.jpg'

/**
 * FEATURE SECTION STUDIES, F01 through F10.
 *
 * Ten structurally distinct ways to feature Ryan's work on the homepage.
 * Every study uses the approved button directions from LabButtons:
 * the dual-wipe red primary and the bracket secondary.
 *
 * "Rooftops and Alleys" is Ryan's real featured piece. Entries named
 * "Placeholder" are layout stand-ins only, to be replaced with real
 * portfolio items. All studies reuse the one available poster image.
 */

const FEATURED = {
  title: 'Rooftops and Alleys',
  meta: 'Trailer Composition · Parkour Videogame',
  desc: 'A score that tracks momentum and holds tension between runs.',
}

const PLACEHOLDERS = [
  { title: 'Placeholder Project 02', meta: 'Exploration Theme' },
  { title: 'Placeholder Project 03', meta: 'Combat Loop' },
  { title: 'Placeholder Project 04', meta: 'Ambient Layer' },
]

function ReelVideo({ className }) {
  return (
    <video
      controls
      className={className}
      preload="metadata"
      poster={videoThumbnail}
      aria-label="Ryan O'Rourke Featured Composition Reel"
    >
      <source src="/video/featured-reel.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

function StudyTag({ id, name }) {
  return (
    <p className={styles.studyTag}>
      <span className={styles.studyId}>{id}</span> {name}
    </p>
  )
}

/* F01 · Cinema Slab
   Full-bleed poster stage with a bottom gradient scrim. The title block
   sits on the image like a film title card. */
function StudyCinemaSlab() {
  return (
    <section className={styles.f01}>
      <StudyTag id="F01" name="Cinema Slab" />
      <div className={styles.f01Stage}>
        <ReelVideo className={styles.f01Video} />
        <div className={styles.f01Scrim} aria-hidden="true" />
        <div className={styles.f01Card}>
          <p className={styles.metaLine}>{FEATURED.meta}</p>
          <h2 className={styles.f01Title}>{FEATURED.title}</h2>
          <div className={styles.btnRow}>
            <PrimaryBtn to="/portfolio">View Work</PrimaryBtn>
            <SecondaryBtn to="/contact">Say Hello</SecondaryBtn>
          </div>
        </div>
      </div>
    </section>
  )
}

/* F02 · Marquee Overlap
   Giant outlined display type runs behind an offset video card that
   overlaps the text block. */
function StudyMarqueeOverlap() {
  return (
    <section className={styles.f02}>
      <StudyTag id="F02" name="Marquee Overlap" />
      <div className={`container ${styles.f02Inner}`}>
        <h2 className={styles.f02Ghost} aria-hidden="true">ROOFTOPS</h2>
        <div className={styles.f02Copy}>
          <p className={styles.metaLine}>{FEATURED.meta}</p>
          <h3 className={styles.f02Title}>{FEATURED.title}</h3>
          <p className={styles.bodyText}>{FEATURED.desc}</p>
          <div className={styles.btnRow}>
            <PrimaryBtn to="/portfolio">Full Portfolio</PrimaryBtn>
          </div>
        </div>
        <div className={styles.f02Card}>
          <ReelVideo className={styles.videoCover} />
        </div>
      </div>
    </section>
  )
}

/* F03 · Filmstrip Rail
   A horizontal scroll-snap rail of work cards with sprocket-hole
   borders, like a strip of celluloid. */
function StudyFilmstripRail() {
  const items = [{ ...FEATURED, featured: true }, ...PLACEHOLDERS]
  return (
    <section className={styles.f03}>
      <StudyTag id="F03" name="Filmstrip Rail" />
      <div className="container">
        <div className={styles.f03Head}>
          <h2 className={styles.sectionTitle}>Selected Work</h2>
          <SecondaryBtn to="/portfolio">All Projects</SecondaryBtn>
        </div>
      </div>
      <div className={styles.f03Rail}>
        {items.map((item) => (
          <figure key={item.title} className={styles.f03Frame}>
            <span className={styles.f03Sprockets} aria-hidden="true" />
            {item.featured ? (
              <ReelVideo className={styles.f03Media} />
            ) : (
              <img
                src={videoThumbnail}
                alt=""
                className={styles.f03Media}
                loading="lazy"
              />
            )}
            <span className={`${styles.f03Sprockets} ${styles.f03SprocketsBottom}`} aria-hidden="true" />
            <figcaption className={styles.f03Caption}>
              <span className={styles.f03CapTitle}>{item.title}</span>
              <span className={styles.metaLine}>{item.meta}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

/* F04 · Tracklist
   An album-style listing. Hovering a row lights animated EQ bars;
   the featured row holds the player on the right. */
function StudyTracklist() {
  const [active, setActive] = useState(0)
  const items = [{ ...FEATURED }, ...PLACEHOLDERS]
  return (
    <section className={styles.f04}>
      <StudyTag id="F04" name="Tracklist" />
      <div className={`container ${styles.f04Inner}`}>
        <div className={styles.f04List}>
          <h2 className={styles.sectionTitle}>Selected Work</h2>
          <ol className={styles.f04Tracks}>
            {items.map((item, i) => (
              <li key={item.title}>
                <button
                  type="button"
                  className={`${styles.f04Row} ${active === i ? styles.f04RowActive : ''}`}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                >
                  <span className={styles.f04Num}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.f04RowText}>
                    <span className={styles.f04RowTitle}>{item.title}</span>
                    <span className={styles.metaLine}>{item.meta}</span>
                  </span>
                  <span className={styles.f04Eq} aria-hidden="true">
                    <span /><span /><span /><span />
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <div className={styles.btnRow}>
            <PrimaryBtn to="/portfolio">View Work</PrimaryBtn>
          </div>
        </div>
        <div className={styles.f04Player}>
          <ReelVideo className={styles.videoCover} />
          <p className={styles.f04NowPlaying}>
            Now playing: {items[active].title}
          </p>
        </div>
      </div>
    </section>
  )
}

/* F05 · Diagonal Cut
   The stage is sliced on a hard diagonal: copy in the top triangle,
   video clipped into the bottom one. */
function StudyDiagonalCut() {
  return (
    <section className={styles.f05}>
      <StudyTag id="F05" name="Diagonal Cut" />
      <div className={styles.f05Stage}>
        <div className={styles.f05Copy}>
          <p className={styles.metaLine}>Featured Work</p>
          <h2 className={styles.f05Title}>{FEATURED.title}</h2>
          <p className={styles.bodyText}>{FEATURED.desc}</p>
          <div className={styles.btnRow}>
            <PrimaryBtn to="/portfolio">View Work</PrimaryBtn>
            <SecondaryBtn to="/contact">Say Hello</SecondaryBtn>
          </div>
        </div>
        <div className={styles.f05Panel}>
          <ReelVideo className={styles.videoCover} />
        </div>
      </div>
    </section>
  )
}

/* F06 · Mosaic
   One dominant tile and three supporting tiles. Hover slides a title
   plate up over each tile. */
function StudyMosaic() {
  return (
    <section className={styles.f06}>
      <StudyTag id="F06" name="Mosaic" />
      <div className={`container ${styles.f06Grid}`}>
        <div className={`${styles.f06Tile} ${styles.f06TileMain}`}>
          <ReelVideo className={styles.videoCover} />
          <div className={styles.f06Plate}>
            <h2 className={styles.f06PlateTitle}>{FEATURED.title}</h2>
            <p className={styles.metaLine}>{FEATURED.meta}</p>
          </div>
        </div>
        {PLACEHOLDERS.map((item) => (
          <div key={item.title} className={styles.f06Tile}>
            <img src={videoThumbnail} alt="" className={styles.videoCover} loading="lazy" />
            <div className={styles.f06Plate}>
              <h3 className={styles.f06PlateSmall}>{item.title}</h3>
              <p className={styles.metaLine}>{item.meta}</p>
            </div>
          </div>
        ))}
        <div className={styles.f06Foot}>
          <PrimaryBtn to="/portfolio">Full Portfolio</PrimaryBtn>
        </div>
      </div>
    </section>
  )
}

/* F07 · Ember Stage
   The smoke shader carries the backdrop while the reel floats centered
   in a glowing frame, presented like a headline act. */
function StudyEmberStage() {
  return (
    <section className={styles.f07}>
      <StudyTag id="F07" name="Ember Stage" />
      <div className={styles.f07Stage}>
        <UnicornScene variant="emberFlow" />
        <div className={styles.f07Scrim} aria-hidden="true" />
        <div className={styles.f07Content}>
          <p className={styles.metaLine}>{FEATURED.meta}</p>
          <h2 className={styles.f07Title}>{FEATURED.title}</h2>
          <div className={styles.f07Frame}>
            <ReelVideo className={styles.videoCover} />
          </div>
          <div className={styles.btnRow}>
            <PrimaryBtn to="/portfolio">View Work</PrimaryBtn>
            <SecondaryBtn to="/contact">Say Hello</SecondaryBtn>
          </div>
        </div>
      </div>
    </section>
  )
}

/* F08 · Spec Sheet
   The reel is presented as a technical document: video on the left,
   a delivery spec table on the right. */
function StudySpecSheet() {
  const specs = [
    ['Project', FEATURED.title],
    ['Role', 'Composer'],
    ['Format', 'Stems + Loops'],
    ['Engines', 'Unity / Unreal / Custom'],
    ['Turnaround', 'Replies within 24 hours'],
  ]
  return (
    <section className={styles.f08}>
      <StudyTag id="F08" name="Spec Sheet" />
      <div className={`container ${styles.f08Inner}`}>
        <div className={styles.f08Monitor}>
          <div className={styles.f08Chrome}>
            <span>PLAYBACK_01</span>
            <span className={styles.f08Led} aria-hidden="true" />
          </div>
          <ReelVideo className={styles.videoCover} />
        </div>
        <div className={styles.f08Sheet}>
          <h2 className={styles.sectionTitle}>Featured Work</h2>
          <dl className={styles.f08Table}>
            {specs.map(([k, v]) => (
              <div key={k} className={styles.f08SpecRow}>
                <dt className={styles.f08Key}>{k}</dt>
                <dd className={styles.f08Val}>{v}</dd>
              </div>
            ))}
          </dl>
          <div className={styles.btnRow}>
            <PrimaryBtn to="/contact">Say Hello</PrimaryBtn>
            <SecondaryBtn to="/portfolio">View Work</SecondaryBtn>
          </div>
        </div>
      </div>
    </section>
  )
}

/* F09 · Deck Fan
   Work stacked like a hand of cards that fans out on hover, the
   featured reel riding on top. */
function StudyDeckFan() {
  return (
    <section className={styles.f09}>
      <StudyTag id="F09" name="Deck Fan" />
      <div className={`container ${styles.f09Inner}`}>
        <div className={styles.f09Copy}>
          <h2 className={styles.sectionTitle}>Selected Work</h2>
          <p className={styles.bodyText}>
            Hover the deck to fan the cards. The reel always rides on top.
          </p>
          <div className={styles.btnRow}>
            <PrimaryBtn to="/portfolio">Full Portfolio</PrimaryBtn>
          </div>
        </div>
        <div className={styles.f09Deck}>
          <div className={`${styles.f09Card} ${styles.f09CardBack2}`} aria-hidden="true">
            <img src={videoThumbnail} alt="" className={styles.videoCover} loading="lazy" />
          </div>
          <div className={`${styles.f09Card} ${styles.f09CardBack1}`} aria-hidden="true">
            <img src={videoThumbnail} alt="" className={styles.videoCover} loading="lazy" />
          </div>
          <div className={`${styles.f09Card} ${styles.f09CardTop}`}>
            <ReelVideo className={styles.videoCover} />
            <p className={styles.f09Caption}>{FEATURED.title}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* F10 · Waveform Podium
   The reel stands on a pedestal of animated level bars, presented like
   a track on a mixing desk. */
function StudyWaveformPodium() {
  const bars = Array.from({ length: 28 })
  return (
    <section className={styles.f10}>
      <StudyTag id="F10" name="Waveform Podium" />
      <div className={`container ${styles.f10Inner}`}>
        <p className={styles.metaLine}>{FEATURED.meta}</p>
        <h2 className={styles.f10Title}>{FEATURED.title}</h2>
        <div className={styles.f10Frame}>
          <ReelVideo className={styles.videoCover} />
        </div>
        <div className={styles.f10Bars} aria-hidden="true">
          {bars.map((_, i) => (
            <span key={i} className={styles.f10Bar} />
          ))}
        </div>
        <div className={styles.btnRow}>
          <PrimaryBtn to="/portfolio">View Work</PrimaryBtn>
          <SecondaryBtn to="/contact">Say Hello</SecondaryBtn>
        </div>
      </div>
    </section>
  )
}

export default function FeatureStudies() {
  return (
    <div className={styles.wrap}>
      <StudyCinemaSlab />
      <StudyMarqueeOverlap />
      <StudyFilmstripRail />
      <StudyTracklist />
      <StudyDiagonalCut />
      <StudyMosaic />
      <StudyEmberStage />
      <StudySpecSheet />
      <StudyDeckFan />
      <StudyWaveformPodium />
    </div>
  )
}
