import Layout from '../components/layout/Layout'
import BlogPostCard from '../components/blog/BlogPostCard'
import { getAllPosts } from '../lib/blog'

export default function BlogListPage() {
  const posts = getAllPosts()

  return (
    <Layout title="Blog" description="Siddharth Saini's blog — technical writing on AI, software, and engineering.">
      <ul>
        <li className="flex gap-2 p-2 text-sm text-gray-500">
          <span className="w-24">Date</span>
          <span>Title</span>
        </li>
        {posts.map((post) => (
          <BlogPostCard key={post.slug} slug={post.slug} title={post.title} date={post.date} />
        ))}
      </ul>
    </Layout>
  )
}
