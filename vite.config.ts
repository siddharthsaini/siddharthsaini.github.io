import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import path from 'path'
import fs from 'node:fs'
import sharp from 'sharp'

const PHOTOS_DIR = path.resolve(__dirname, 'public/photography')
const CAPTIONS_FILE = path.resolve(__dirname, 'src/data/captions.json')
const PHOTO_FILE = /\.(jpe?g|png|webp|avif|gif)$/i
const VIRTUAL_ID = 'virtual:photos'
const RESOLVED_ID = `\0${VIRTUAL_ID}`

/**
 * Mirrors the gallery into src/data/captions.json so every photo has a slot to
 * fill in: new files are added with an empty caption, existing captions are
 * preserved, and entries for photos that are gone are dropped. Written only
 * when something actually changed, so it never churns or loops HMR.
 */
function syncCaptions(files: string[]) {
  let existing: Record<string, unknown> = {}
  if (fs.existsSync(CAPTIONS_FILE)) {
    try {
      existing = JSON.parse(fs.readFileSync(CAPTIONS_FILE, 'utf8'))
    } catch {
      console.warn('[photo-manifest] captions.json is not valid JSON — leaving it alone')
      return
    }
  }

  const next: Record<string, string> = {}
  for (const file of files) {
    next[file] = typeof existing[file] === 'string' ? (existing[file] as string) : ''
  }

  const serialised = `${JSON.stringify(next, null, 2)}\n`
  if (fs.existsSync(CAPTIONS_FILE) && fs.readFileSync(CAPTIONS_FILE, 'utf8') === serialised) return

  fs.mkdirSync(path.dirname(CAPTIONS_FILE), { recursive: true })
  fs.writeFileSync(CAPTIONS_FILE, serialised)

  const added = files.filter((file) => !(file in existing))
  const removed = Object.keys(existing).filter((file) => !(file in next))
  if (added.length) console.log(`[photo-manifest] captions.json: added ${added.join(', ')}`)
  if (removed.length) console.log(`[photo-manifest] captions.json: dropped ${removed.join(', ')}`)
}

/**
 * Exposes every image sitting in public/photography as `virtual:photos`,
 * reading its dimensions with sharp. There is no manifest file to regenerate:
 * drop a photo in that folder and it is on the site after the next build.
 */
function photoManifest(): Plugin {
  return {
    name: 'photo-manifest',
    resolveId: (id) => (id === VIRTUAL_ID ? RESOLVED_ID : null),
    async load(id) {
      if (id !== RESOLVED_ID) return null
      if (!fs.existsSync(PHOTOS_DIR)) {
        console.warn(`[photo-manifest] ${PHOTOS_DIR} does not exist — gallery is empty`)
        return 'export const photos = []'
      }

      const files = fs
        .readdirSync(PHOTOS_DIR)
        .filter((file) => PHOTO_FILE.test(file) && fs.statSync(path.join(PHOTOS_DIR, file)).isFile())
        .sort((a, b) => a.localeCompare(b))

      syncCaptions(files)

      const photos = []
      for (const file of files) {
        try {
          const { width, height } = await sharp(path.join(PHOTOS_DIR, file)).metadata()
          photos.push({
            file,
            src: `/photography/${encodeURIComponent(file)}`,
            width: width ?? 1,
            height: height ?? 1,
          })
        } catch (error) {
          console.warn(`[photo-manifest] skipping ${file}: ${(error as Error).message}`)
        }
      }

      return `export const photos = ${JSON.stringify(photos)}`
    },
  }
}

export default defineConfig({
  plugins: [
    photoManifest(),
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [
          remarkFrontmatter,
          remarkMdxFrontmatter,
          remarkGfm,
        ],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          [rehypePrettyCode, { theme: 'github-dark' }],
        ],
      }),
    },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
