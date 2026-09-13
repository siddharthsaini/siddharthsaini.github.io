import { useParams, Navigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { getPostBySlug } from '../lib/blog'

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) return <Navigate to="/blog" replace />

  const PostContent = post.component

  return (
    <Layout title={post.title} description={post.description}>
      <header className="flex flex-col items-center justify-between md:flex-row">
        <h1 className="text-center text-2xl font-bold">{post.title}</h1>
        <time dateTime={post.date} className="text-sm text-gray-500">
          {formatDate(post.date)}
        </time>
      </header>
      <hr />
      <article className="prose">
        <PostContent />
      </article>
    </Layout>
  )
}
