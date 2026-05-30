import { useState, useEffect } from 'react'
import { getPortfolioItems, getPortfolioCategories } from '../api/wp.js'

/**
 * Returns all portfolio items + categories, with loading/error state.
 * Optionally filter by category slug.
 */
export function usePortfolio(filterCategory = null) {
  const [items, setItems]           = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    Promise.all([getPortfolioItems(), getPortfolioCategories()])
      .then(([rawItems, rawCats]) => {
        if (cancelled) return
        setCategories(rawCats)
        const filtered = filterCategory
          ? rawItems.filter(item =>
              item.portfolio_category?.includes(
                rawCats.find(c => c.slug === filterCategory)?.id
              )
            )
          : rawItems
        setItems(filtered)
      })
      .catch(err => { if (!cancelled) setError(err) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [filterCategory])

  return { items, categories, loading, error }
}
