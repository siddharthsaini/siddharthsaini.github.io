import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import Header from './Header'

const SITE_URL = 'https://siddharthsaini.com'

interface LayoutProps {
  children?: React.ReactNode
  title?: string
  description?: string
  /** Full-bleed page: 8px sides/bottom instead of 24px (photography collage). */
  bleed?: boolean
}

export default function Layout({ children, title, description, bleed = false }: LayoutProps) {
  const { pathname } = useLocation()
  const pageTitle = title ? `${title} - Siddharth Saini` : 'Siddharth Saini'
  const pageDesc = description ?? "Siddharth Saini's Personal Site"
  const pageUrl = `${SITE_URL}${pathname}`

  return (
    <div
      className={`mx-auto flex max-w-3xl flex-col gap-8 pt-8 ${bleed ? 'px-2 pb-2' : 'px-6 pb-6'}`}
    >
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={pageUrl} />
      </Helmet>
      <Header />
      {children}
    </div>
  )
}
