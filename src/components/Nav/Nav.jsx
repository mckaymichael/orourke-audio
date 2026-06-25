import { NavLink } from 'react-router-dom'
import styles from './Nav.module.css'
import logoSvg from '../../images/logo/Primary Logo - White.svg'

const links = [
  { to: '/portfolio', label: 'Work'    },
  { to: '/about',     label: 'About'   },
  { to: '/contact',   label: 'Contact' },
]

export default function Nav() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <NavLink to="/" className={styles.logo} aria-label="O'Rourke Audio Home">
          <img src={logoSvg} className={styles.logoImg} alt="O'Rourke Audio Logo" />
        </NavLink>

        <nav aria-label="Main navigation">
          <ul className={styles.links}>
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.active : ''}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <NavLink to="/contact" className={`btn btn-primary ${styles.cta}`}>
          Get in Touch
        </NavLink>
      </div>
    </header>
  )
}
