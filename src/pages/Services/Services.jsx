import { useServices } from '../../hooks/useServices.js'
import { Link } from 'react-router-dom'
import styles from './Services.module.css'

/**
 * SERVICES + ABOUT PAGE
 *
 * Top half: Services pulled from WordPress (custom post type: "service")
 * Bottom half: About section (Ryan's story and differentiator)
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
            Transparent, project-based pricing for games and interactive media.
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
              <h2 className="section-title">A musician's ear.<br />Built for games.</h2>
              <p className={styles.bio}>
                Ryan O'Rourke is a Vancouver-based composer with roots in music production
                and a focus on interactive media. He writes original music that serves the
                game, whether that is an expansive orchestral OST, a looping ambient set,
                or a single main theme that carries the whole identity of the project.
              </p>
              <p className={styles.bio}>
                His home studio background is a feature, not a limitation. It means lean
                overhead, real timelines, and a composer who communicates like a collaborator
                rather than a vendor.
              </p>
              <p className={styles.bio}>
                Based in Vancouver. Available remotely for studios worldwide.
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

/** Shown when WP has no services yet, hardcoded fallback for dev */
function ServicesFallback() {
  const fallback = [
    {
      title: 'Original Soundtrack',
      tagline: 'A full score written for your game, start to finish',
      price: '$1,200',
      features: ['Original composition in any genre', 'Stem delivery for adaptive implementation', 'Loop-ready formatting', 'Unlimited revisions within scope'],
    },
    {
      title: 'Main Theme & Key Cues',
      tagline: 'The musical identity your game leads with',
      price: '$600',
      features: ['Main theme with motif development', 'Title screen, victory, and game-over variants', 'Mixed and mastered master files', 'Stem delivery on request'],
    },
    {
      title: 'Ambient & Loop Packs',
      tagline: 'Seamless background music for every zone and mood',
      price: '$400',
      features: ['Seamlessly looping tracks', 'Biome or mood-matched sets', 'Multiple intensity layers', 'Engine-agnostic file formats'],
    },
    {
      title: 'Cinematic & Trailer Score',
      tagline: 'Music that sells the moment before the game ships',
      price: '$800',
      features: ['Synced to picture', 'Orchestral, electronic, or hybrid', 'Full mixed master + stems', 'Revision rounds included'],
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
