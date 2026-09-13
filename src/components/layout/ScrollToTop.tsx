import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/**
 * React Router keeps the document scroll position across client-side
 * navigations, so a new page opens wherever the previous one was scrolled to.
 * Reset to the top on PUSH/REPLACE navigations, but leave POP (back/forward)
 * and hash links alone — those are handled by the browser and by the home
 * page's `#about` / `#tech` scroll handler.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (hash || navigationType === 'POP') return
    window.scrollTo(0, 0)
  }, [pathname, hash, navigationType])

  return null
}
