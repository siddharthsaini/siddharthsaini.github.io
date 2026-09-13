import type { BlogPost } from './types'

const modules = import.meta.glob('../content/blog/*.mdx', { eager: true })

export function getAllPosts(): BlogPost[] {
  return Object.entries(modules)
    .map(([filePath, mod]) => {
      const m = mod as Record<string, unknown>
      const frontmatter = m['frontmatter'] as Omit<BlogPost, 'slug' | 'component'>
      return {
        slug: filePath.split('/').pop()!.replace('.mdx', ''),
        ...frontmatter,
        component: m['default'] as BlogPost['component'],
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug)
}
