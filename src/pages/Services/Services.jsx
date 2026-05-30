import { useServices } from '../../hooks/useServices.js'
import { Link } from 'react-router-dom'
import styles from './Services.module.css'

/**
 * SERVICES + ABOUT PAGE
 *
 * Top half: Services pulled from WordPress (custom post type: "service")
 * Bottom half: About section — Ryan's story and differentiator
 *
 * ACF fields per service: tagline, features (repeater), starting_price, cta_label
 */
export default function Services() {
  const { services, loading, error } = useServices()

  return (
    <div className={styles.page}>
      {/* ── Services ─────────────────────────── */}
      <section className={`section ${styles.servicesSection}`}>
        <div className="container">
          <p className="section-label">What I Offer</p>
          <h1 className="section-title">Services</h1>
          <p className="section-body">
            Transparent, project-based pricing for film, video, and interactive media.
            Every engagement includes unlimited revisions within scope.
          </p>

          {loading && <p className={styles.state}>Loading services…</p>}
          {error   && <p className={styles.state}>Failed to load services.</p>}

          {!loading && !error && (
            <div className={styles.grid}>
              {services.length === 0
                ? <ServicesFallback />
                : services.map(s => <ServiceCard key={s.id} service={s} />)
              }
            </div>
          )}

          <div className={styles.rateNote}>
            <p className={`font-mono ${styles.rateText}`}>
              Hourly rate: $65–$95 / hr &nbsp;·&nbsp; Day rate: $350–$550
            </p>
            <Link to="/contact" className="btn btn-primary">Get a Quote</Link>
          </div>
        </div>
      </section>

      {/* ── About ────────────────────────────── */}
      <section className={`section ${styles.about}`}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <p className="section-label">About</p>
              <h2 className="section-title">A musician's ear.<br />An engineer's precision.</h2>
              <p className={styles.bio}>
                Ryan O'Rourke is a Vancouver-based sound designer, engineer, and composer
                with roots in music production and a focus on film and media. He brings
                the rare ability to design a complete sonic world <em>and</em> score it —
                from first sound effect to final mix.
              </p>
              <p className={styles.bio}>
                His home studio background isn't a limitation — it's proof he knows how
                to produce broadcast-ready audio on a lean budget, exactly what independent
                productions need.
              </p>
              <p className={styles.bio}>
                Available for remote sessions via Source-Connect, and for on-set and
                studio work throughout Metro Vancouver.
              </p>
              <Link to="/contact" className={`btn btn-outline ${styles.aboutCta}`}>
                Work with Ryan →
              </Link>
            </div>
            <div className={styles.aboutStats}>
              {[
                { label: 'Services', value: '5+' },
                { label: 'Disciplines', value: '4' },
                { label: 'Based in', value: 'Vancouver' },
                { label: 'Remote ready', value: 'Yes' },
              ].map(({ label, value }) => (
                <div key={label} className={`card ${styles.stat}`}>
                  <span className={styles.statValue}>{value}</span>
                  <span className={styles.statLabel}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ServiceCard({ service }) {
  const acf     = service.acf ?? {}
  const title   = service.title?.rendered ?? 'Service'
  const tagline = acf.tagline ?? ''
  const features = typeof acf.features === 'string'
    ? acf.features.split('\n').map(f => f.trim()).filter(Boolean)
    : []
  const price   = acf.starting_price ?? ''

  return (
    <article className={`card ${styles.serviceCard}`}>
      <div className={styles.serviceHead}>
        <h2 className={styles.serviceTitle}>{title}</h2>
        {tagline && <p className={styles.serviceTagline}>{tagline}</p>}
        {price && (
          <p className={`font-mono ${styles.servicePrice}`}>From {price}</p>
        )}
      </div>
      {features.length > 0 && (
        <ul className={styles.features}>
          {features.map((f, i) => (
            <li key={i} className={styles.feature}>
              <span className={styles.featureDot} aria-hidden="true" />
              {typeof f === 'string' ? f : f.feature}
            </li>
          ))}
        </ul>
      )}
      <Link to="/contact" className={`btn btn-outline ${styles.serviceBtn}`}>
        Inquire
      </Link>
    </article>
  )
}

/** Shown when WP has no services yet — hardcoded fallback for dev */
function ServicesFallback() {
  const fallback = [
    {
      title: 'Sound Design',
      tagline: 'Complete sonic worlds built from scratch',
      price: '$800',
      features: ['Atmosphere & ambience', 'Transitions & impacts', 'Custom SFX library'],
    },
    {
      title: 'Foley & SFX',
      tagline: 'Original and library sound effects, tailored to picture',
      price: '$600',
      features: ['Footsteps & cloth', 'Props & environment', 'Spot effects edited to cut'],
    },
    {
      title: 'Original Score',
      tagline: 'Full music production in any genre, delivered as stems',
      price: '$1,200',
      features: ['Temp-track replacement', 'Stem delivery for re-edit flexibility', 'Dolby-compliant masters'],
    },
    {
      title: 'Audio Editing & Mix',
      tagline: 'Dialogue, ADR, music mix, and broadcast deliverables',
      price: '$500',
      features: ['Dialogue cleanup & noise reduction', 'ADR support', 'Streaming & broadcast spec output'],
    },
  ]

  return (
    <>
      {fallback.map(s => (
        <article key={s.title} className={`card ${styles.serviceCard}`}>
          <div className={styles.serviceHead}>
            <h2 className={styles.serviceTitle}>{s.title}</h2>
            <p className={styles.serviceTagline}>{s.tagline}</p>
            <p className={`font-mono ${styles.servicePrice}`}>From {s.price}</p>
          </div>
          <ul className={styles.features}>
            {s.features.map(f => (
              <li key={f} className={styles.feature}>
                <span className={styles.featureDot} aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
          <Link to="/contact" className={`btn btn-outline ${styles.serviceBtn}`}>
            Inquire
          </Link>
        </article>
      ))}
    </>
  )
}
