import { Link } from 'react-router-dom'

interface BlogPostCardProps {
  slug: string
  title: string
  date: string
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function BlogPostCard({ slug, title, date }: BlogPostCardProps) {
  return (
    <li>
      <Link
        to={`/blog/${slug}`}
        className="flex items-center gap-2 p-2 hover:bg-gray-100"
      >
        <time dateTime={date} className="w-24 shrink-0 text-sm text-gray-500">
          {formatDate(date)}
        </time>
        <span>{title}</span>
      </Link>
    </li>
  )
}
