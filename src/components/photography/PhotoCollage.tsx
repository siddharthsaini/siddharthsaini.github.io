import { useState, useSyncExternalStore } from 'react'
import { photos, type Photo } from '../../lib/photos'
import captions from '../../data/captions.json'
import PhotoViewer from './PhotoViewer'

const captionMap: Record<string, string> = captions

/** Fisher–Yates shuffle, so the gallery order changes on every visit. */
function shuffle(items: Photo[]): Photo[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

/** Tailwind's `sm` breakpoint: 3 columns from 640px up, 2 below. */
function useIsWide() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia('(min-width: 640px)')
      query.addEventListener('change', onChange)
      return () => query.removeEventListener('change', onChange)
    },
    () => window.matchMedia('(min-width: 640px)').matches,
    () => false,
  )
}

/**
 * Pack the photos into `count` columns, always appending to the shortest one.
 * Heights come from the manifest, so this needs no measuring and both columns
 * start at the same top edge.
 */
function buildColumns(items: Photo[], count: number): Photo[][] {
  const columns: Photo[][] = Array.from({ length: count }, () => [])
  const heights = new Array<number>(count).fill(0)

  for (const photo of items) {
    let target = 0
    for (let i = 1; i < count; i += 1) {
      if (heights[i] < heights[target]) target = i
    }
    columns[target].push(photo)
    heights[target] += photo.height / photo.width
  }

  return columns
}

export default function PhotoCollage() {
  const [order] = useState(() => shuffle(photos))
  const [active, setActive] = useState<Photo | null>(null)
  const columns = buildColumns(order, useIsWide() ? 3 : 2)

  return (
    <>
      <div className="flex items-start gap-2">
        {columns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="flex min-w-0 flex-1 flex-col gap-2"
          >
            {column.map((photo) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setActive(photo)}
                aria-label={`Open photo ${order.indexOf(photo) + 1} of ${order.length}`}
                className="group relative block w-full cursor-pointer overflow-hidden rounded-lg bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
                style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
              >
                <img
                  src={photo.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:opacity-90"
                />
              </button>
            ))}
          </div>
        ))}
      </div>

      {active && (
        <PhotoViewer
          key={active.src}
          photo={active}
          caption={captionMap[active.file] ?? ''}
          onClose={() => setActive(null)}
        />
      )}
    </>
  )
}
