import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{ paddingTop: '72px', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <p className="section-label font-mono">404</p>
        <h1 className="section-title">Page not found</h1>
        <p className="section-body">That page doesn't exist — maybe it moved, maybe it never did.</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '2rem' }}>
          Back to Home
        </Link>
      </div>
    </div>
  )
}
