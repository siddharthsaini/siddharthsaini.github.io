interface TOCEntry {
  id: string
  text: string
  depth: 2 | 3
}

interface TableOfContentsProps {
  headings: TOCEntry[]
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length === 0) return null

  return (
    <nav className="text-sm text-gray-500">
      <p className="mb-2 font-semibold text-gray-700">Contents</p>
      <ul className="flex flex-col gap-1">
        {headings.map((h) => (
          <li key={h.id} className={h.depth === 3 ? 'pl-4' : ''}>
            <a href={`#${h.id}`} className="hover:underline">
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
