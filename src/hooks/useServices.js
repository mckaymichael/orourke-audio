import { useState, useEffect } from 'react'
import { getServices } from '../api/wp.js'

export function useServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => {
    let cancelled = false
    getServices()
      .then(data => { if (!cancelled) setServices(data) })
      .catch(err  => { if (!cancelled) setError(err) })
      .finally(()  => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return { services, loading, error }
}
