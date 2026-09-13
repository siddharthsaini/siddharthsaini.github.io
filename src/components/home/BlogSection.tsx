import { Link } from 'react-router-dom'
import Section from '../ui/Section'
import { getAllPosts } from '../../lib/blog'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function BlogSection() {
  const posts = getAllPosts()

  return (
    <Section id="blog" title="Blog">
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/blog/${post.slug}`} className="flex items-start justify-between gap-4">
              <h3 className="font-semibold">{post.title}</h3>
              <time dateTime={post.date} className="shrink-0 text-sm text-neutral-500">
                {formatDate(post.date)}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}
