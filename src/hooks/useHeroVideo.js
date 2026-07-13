import { useState, useEffect } from 'react'
import { getHeroVideo } from '../api/wp.js'

/**
 * Returns the hero reel video URL from the WordPress Media Library,
 * with loading/error state. See getHeroVideo() in api/wp.js.
 */
export function useHeroVideo() {
  const [url, setUrl]         = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    getHeroVideo()
      .then(u => { if (!cancelled) setUrl(u) })
      .catch(err => { if (!cancelled) setError(err) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [])

  return { url, loading, error }
}
