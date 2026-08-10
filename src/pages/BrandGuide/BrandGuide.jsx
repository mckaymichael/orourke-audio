import { useEffect, useState } from 'react'
import styles from './BrandGuide.module.css'

import primaryLogoWhite from '../../images/logo/Primary Logo - White.svg'
import primaryLogoDark from '../../images/logo/Pimary Logo.svg'
import secondaryLogoWhite from '../../images/logo/Secondary Logo - White.svg'
import secondaryLogoDark from '../../images/logo/Secondary Logo.svg'
import wordmarkWhite from '../../images/logo/Wordmark - White.svg'
import wordmarkDark from '../../images/logo/Wordmark.svg'
import submarkWhite from '../../images/logo/Submark Logo (AKA Lettermark) - White.svg'
import submarkDark from '../../images/logo/Submark Logo.svg'
import faviconWhite from '../../images/logo/Favicon - White.svg'
import faviconDark from '../../images/logo/Favicon.svg'
import waveWhite from '../../images/logo/Wave - White.svg'

/**
 * HIDDEN PAGE: Brand guide.
 *
 * Not linked from Nav, Footer, or BottomNav. Reachable only by direct URL
 * (/lab/brand-guide). Marked noindex so it never surfaces in search.
 *
 * Purpose: a single visual reference for every logo asset, colour token, and
 * type style in the O'Rourke Audio system. Every value on this page is read
 * from src/styles/global.css — if a token changes there, update it here too.
 */

const LOGOS = [
  {
    name: 'Primary Logo',
    file: 'Primary Logo - White.svg / Pimary Logo.svg',
    light: primaryLogoWhite,
    dark: primaryLogoDark,
    ratio: '721.1 × 124',
    use: 'The default lockup. Wave symbol, wordmark, and descriptor together. Use this anywhere there is room for a wide, horizontal mark: site header, letterhead, email signature, deck title slides.',
    inUse: 'Site navigation bar (Nav.jsx)',
    maxWidth: 420,
  },
  {
    name: 'Secondary Logo',
    file: 'Secondary Logo - White.svg / Secondary Logo.svg',
    light: secondaryLogoWhite,
    dark: secondaryLogoDark,
    ratio: '721.1 × 72',
    use: 'A shorter single-line version of the lockup. Reach for this when the primary is too tall for the space, such as a narrow footer strip, a video lower third, or a banner.',
    inUse: 'Available, not currently placed',
    maxWidth: 420,
  },
  {
    name: 'Wordmark',
    file: 'Wordmark - White.svg / Wordmark.svg',
    light: wordmarkWhite,
    dark: wordmarkDark,
    ratio: '921.08 × 72',
    use: 'Name only, no symbol. Use where the wave mark already appears nearby, or where the symbol would read as visual noise. The widest of the assets, so give it room.',
    inUse: 'Available, not currently placed',
    maxWidth: 460,
  },
  {
    name: 'Submark (Lettermark)',
    file: 'Submark Logo (AKA Lettermark) - White.svg / Submark Logo.svg',
    light: submarkWhite,
    dark: submarkDark,
    ratio: '387.71 × 72',
    use: 'A compact lettermark for tight horizontal spaces: social profile headers, watermark on a thumbnail, stamp on a mix bounce.',
    inUse: 'Available, not currently placed',
    maxWidth: 300,
  },
  {
    name: 'Favicon',
    file: 'Favicon - White.svg / Favicon.svg',
    light: faviconWhite,
    dark: faviconDark,
    ratio: '70 × 71.84',
    use: 'The square-ish icon build. Browser tab, app icon, social avatar, anything that crops to a circle or square.',
    inUse: 'Browser tab via /favicon.svg',
    maxWidth: 88,
  },
  {
    name: 'Wave Symbol',
    file: 'Wave - White.svg',
    light: waveWhite,
    dark: null,
    ratio: '22.5 × 71.84',
    use: 'The single wave stroke pulled out on its own. Works as a bullet, a divider, a loading mark, or a repeated texture element. Light version only, so place it on dark or tint it in CSS.',
    inUse: 'Available, not currently placed',
    maxWidth: 40,
  },
]

const CORE_COLOURS = [
  {
    token: '--color-bg',
    hex: '#121010',
    name: 'Black',
    role: 'Page background everywhere. The site is dark by default, so this is the canvas almost every other colour sits on.',
    text: '#F7F0F1',
  },
  {
    token: '--color-white',
    hex: '#F7F0F1',
    name: 'White',
    role: 'Primary text and logo colour. Warm off-white rather than pure white, which keeps the screen from feeling clinical.',
    text: '#121010',
  },
  {
    token: '--color-primary',
    hex: '#E8181F',
    name: 'Primary Red',
    role: 'The signature colour. Buttons, active states, accents, links. Use it sparingly so it keeps its punch.',
    text: '#F7F0F1',
  },
  {
    token: '--color-secondary',
    hex: '#E8676C',
    name: 'Secondary Red',
    role: 'A softer red for section labels, kickers, and supporting accents where the primary would shout.',
    text: '#121010',
  },
]

const SUPPORT_COLOURS = [
  {
    token: '--color-primary-dim',
    hex: '#C01419',
    name: 'Primary Dim',
    role: 'Hover state for primary buttons.',
    text: '#F7F0F1',
  },
  {
    token: '--color-surface',
    hex: '#1E1516',
    name: 'Surface',
    role: 'Card and panel background, one step up from the page.',
    text: '#F7F0F1',
  },
  {
    token: '--color-surface-2',
    hex: '#261518',
    name: 'Surface 2',
    role: 'Raised or nested panels that need to separate from Surface.',
    text: '#F7F0F1',
  },
  {
    token: '--color-mid-grey',
    hex: '#9A8A8C',
    name: 'Mid Grey',
    role: 'Body copy, captions, and any text that should sit behind the headline.',
    text: '#121010',
  },
  {
    token: '--color-border',
    hex: 'rgba(247, 240, 241, 0.1)',
    name: 'Border',
    role: 'Hairline dividers and card outlines. White at 10 percent, so it adapts to whatever sits behind it.',
    text: '#F7F0F1',
  },
]

const TYPE_SCALE = [
  { token: '--text-6xl', rem: '3.75rem', px: '60px', use: 'Hero headline' },
  { token: '--text-5xl', rem: '3rem', px: '48px', use: 'Page title' },
  { token: '--text-4xl', rem: '2.25rem', px: '36px', use: 'Section title' },
  { token: '--text-3xl', rem: '1.875rem', px: '30px', use: 'Sub-section title' },
  { token: '--text-2xl', rem: '1.5rem', px: '24px', use: 'Card heading' },
  { token: '--text-xl', rem: '1.25rem', px: '20px', use: 'Lead paragraph' },
  { token: '--text-lg', rem: '1.125rem', px: '18px', use: 'Large body' },
  { token: '--text-base', rem: '1rem', px: '16px', use: 'Body default' },
  { token: '--text-sm', rem: '0.875rem', px: '14px', use: 'Button, caption' },
  { token: '--text-xs', rem: '0.75rem', px: '12px', use: 'Label, kicker' },
]

function Swatch({ colour }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(colour.hex)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button type="button" className={styles.swatch} onClick={copy}>
      <span
        className={styles.swatchChip}
        style={{ backgroundColor: colour.hex, color: colour.text }}
      >
        <span className={styles.swatchHex}>{copied ? 'Copied' : colour.hex}</span>
      </span>
      <span className={styles.swatchMeta}>
        <span className={styles.swatchName}>{colour.name}</span>
        <code className={styles.swatchToken}>{colour.token}</code>
        <span className={styles.swatchRole}>{colour.role}</span>
      </span>
    </button>
  )
}

export default function BrandGuide() {
  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Brand Guide (Internal) | O’Rourke Audio'

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
        Internal reference page · Not linked in navigation · Not indexed
      </div>

      <header className={styles.intro}>
        <p className={styles.introKicker}>O’Rourke Audio · Brand Guide</p>
        <h1 className={styles.introTitle}>Logo, colour, and type</h1>
        <p className={styles.introBody}>
          Every asset and token the brand runs on, in one place. Colours and type
          sizes here are read directly from{' '}
          <code className={styles.inlineCode}>src/styles/global.css</code>, so
          this page and the shipped site stay in step. Click any swatch to copy
          its hex.
        </p>
      </header>

      {/* LOGOS */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionTag}>01</span>
          <h2 className={styles.sectionTitle}>Logo Assets</h2>
          <p className={styles.sectionDesc}>
            Six assets, each supplied as an SVG in two colourways. The white
            build is filled <code className={styles.inlineCode}>#F7F0F1</code>.
            The dark build carries no fill attribute, so it renders black by
            default and needs a light background behind it.
          </p>
        </div>

        <div className={styles.logoList}>
          {LOGOS.map((logo) => (
            <article key={logo.name} className={styles.logoRow}>
              <div className={styles.logoInfo}>
                <h3 className={styles.logoName}>{logo.name}</h3>
                <p className={styles.logoUse}>{logo.use}</p>
                <dl className={styles.logoSpecs}>
                  <div>
                    <dt>File</dt>
                    <dd>{logo.file}</dd>
                  </div>
                  <div>
                    <dt>Viewbox</dt>
                    <dd>{logo.ratio}</dd>
                  </div>
                  <div>
                    <dt>In use</dt>
                    <dd>{logo.inUse}</dd>
                  </div>
                </dl>
              </div>

              <div className={styles.logoPreviews}>
                <figure className={styles.previewDark}>
                  <div className={styles.previewStage}>
                    <img
                      src={logo.light}
                      alt={`${logo.name}, white on black`}
                      style={{ maxWidth: logo.maxWidth }}
                    />
                  </div>
                  <figcaption>On black · #121010</figcaption>
                </figure>

                {logo.dark ? (
                  <figure className={styles.previewLight}>
                    <div className={styles.previewStage}>
                      <img
                        src={logo.dark}
                        alt={`${logo.name}, black on white`}
                        style={{ maxWidth: logo.maxWidth }}
                      />
                    </div>
                    <figcaption>On white · #F7F0F1</figcaption>
                  </figure>
                ) : (
                  <figure className={styles.previewAccent}>
                    <div className={styles.previewStage}>
                      <img
                        src={logo.light}
                        alt={`${logo.name}, white on red`}
                        style={{ maxWidth: logo.maxWidth }}
                      />
                    </div>
                    <figcaption>On primary · #E8181F</figcaption>
                  </figure>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className={styles.rules}>
          <h3 className={styles.rulesTitle}>Usage rules</h3>
          <ul className={styles.rulesList}>
            <li>
              Keep clear space around the mark equal to the height of the wave
              symbol on all four sides.
            </li>
            <li>
              Never recolour the logo outside the palette. White, black, or a
              solid primary red background are the only approved treatments.
            </li>
            <li>
              Never stretch, skew, rotate, or add a drop shadow, outline, or
              bevel to the mark.
            </li>
            <li>
              Do not place the dark logo on a dark photo. Switch to the white
              build, or drop a scrim behind it.
            </li>
            <li>
              Below roughly 120px wide, drop the primary lockup and use the
              submark or favicon instead.
            </li>
          </ul>
        </div>
      </section>

      {/* COLOUR */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionTag}>02</span>
          <h2 className={styles.sectionTitle}>Colour</h2>
          <p className={styles.sectionDesc}>
            Four core colours carry the brand. The support tokens exist so
            surfaces, borders, and hover states stay consistent without inventing
            new values.
          </p>
        </div>

        <h3 className={styles.groupTitle}>Core palette</h3>
        <div className={styles.swatchGrid}>
          {CORE_COLOURS.map((c) => (
            <Swatch key={c.token} colour={c} />
          ))}
        </div>

        <h3 className={styles.groupTitle}>Support tokens</h3>
        <div className={styles.swatchGrid}>
          {SUPPORT_COLOURS.map((c) => (
            <Swatch key={c.token} colour={c} />
          ))}
        </div>

        <div className={styles.note}>
          <strong>Spec note.</strong> The original Design Brief lists the reds as
          #CC1D23 and #DB6165. The shipped site uses #E8181F and #E8676C, which
          is what this guide documents as canonical. The Design Brief needs a
          matching update.
        </div>

        <h3 className={styles.groupTitle}>Texture</h3>
        <div className={styles.textureRow}>
          <div className={styles.textureCard}>
            <div className={styles.gradientDemo} />
            <p className={styles.textureCaption}>
              <strong>Primary gradient.</strong> Red into black, the signature
              background wash.
              <code className={styles.inlineCode}>
                linear-gradient(160deg, #E8181F 0%, #121010 70%)
              </code>
            </p>
          </div>
          <div className={styles.textureCard}>
            <div className={styles.grainDemo} />
            <p className={styles.textureCaption}>
              <strong>Film grain.</strong> An animated fractal-noise SVG applied
              site-wide via <code className={styles.inlineCode}>body::after</code>
              , 0.6 opacity, soft-light blend. It disables under{' '}
              <code className={styles.inlineCode}>prefers-reduced-motion</code>.
            </p>
          </div>
        </div>
      </section>

      {/* TYPE */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionTag}>03</span>
          <h2 className={styles.sectionTitle}>Typography</h2>
          <p className={styles.sectionDesc}>
            Two families. Orbitron for anything that should feel engineered and
            cinematic, Inter for everything a person actually has to read.
          </p>
        </div>

        <div className={styles.faceGrid}>
          <div className={styles.face}>
            <p className={styles.faceRole}>Headings · --font-heading</p>
            <p className={styles.faceNameHeading}>Orbitron</p>
            <p className={styles.faceAlphabetHeading}>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
              <br />
              abcdefghijklmnopqrstuvwxyz
              <br />
              0123456789 &amp; ? ! # @
            </p>
            <div className={styles.weightRow}>
              <span style={{ fontFamily: 'Orbitron', fontWeight: 600 }}>
                600 Semibold
              </span>
              <span style={{ fontFamily: 'Orbitron', fontWeight: 700 }}>
                700 Bold
              </span>
              <span style={{ fontFamily: 'Orbitron', fontWeight: 900 }}>
                900 Black
              </span>
            </div>
            <p className={styles.faceNote}>
              Geometric, wide, technical. Reserve it for headlines and short
              labels. It becomes hard work past a line or two.
            </p>
          </div>

          <div className={styles.face}>
            <p className={styles.faceRole}>Body · --font-body</p>
            <p className={styles.faceNameBody}>Inter</p>
            <p className={styles.faceAlphabetBody}>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
              <br />
              abcdefghijklmnopqrstuvwxyz
              <br />
              0123456789 &amp; ? ! # @
            </p>
            <div className={styles.weightRow}>
              <span style={{ fontWeight: 400 }}>400 Regular</span>
              <span style={{ fontWeight: 500 }}>500 Medium</span>
              <span style={{ fontWeight: 600 }}>600 Semibold</span>
              <span style={{ fontWeight: 700 }}>700 Bold</span>
            </div>
            <p className={styles.faceNote}>
              Body copy, buttons, form fields, and navigation. Default line
              height is 1.7, and 1.8 for long-form paragraphs.
            </p>
          </div>
        </div>

        <h3 className={styles.groupTitle}>Type scale</h3>
        <div className={styles.scaleList}>
          {TYPE_SCALE.map((s) => (
            <div key={s.token} className={styles.scaleRow}>
              <div className={styles.scaleMeta}>
                <code className={styles.scaleToken}>{s.token}</code>
                <span className={styles.scaleSize}>
                  {s.rem} · {s.px}
                </span>
                <span className={styles.scaleUse}>{s.use}</span>
              </div>
              <p
                className={styles.scaleSample}
                style={{ fontSize: `var(${s.token})` }}
              >
                Sound design
              </p>
            </div>
          ))}
        </div>

        <h3 className={styles.groupTitle}>Applied styles</h3>
        <div className={styles.applied}>
          <p className={styles.appliedLabel}>Section label</p>
          <h4 className={styles.appliedTitle}>A section title in Orbitron</h4>
          <p className={styles.appliedBody}>
            Body copy sits in Inter at 1.125rem with a 1.8 line height and a
            65-character measure. Mid grey keeps it a step behind the headline
            without dropping below a comfortable contrast on the black
            background.
          </p>
          <div className={styles.appliedButtons}>
            <span className={styles.btnPrimary}>Primary button</span>
            <span className={styles.btnOutline}>Outline button</span>
          </div>
        </div>
      </section>

      <footer className={styles.outro}>
        Source of truth · src/styles/global.css · src/images/logo
      </footer>
    </div>
  )
}
