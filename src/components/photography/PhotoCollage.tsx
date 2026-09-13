import { useState } from 'react'
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

export default function PhotoCollage() {
  const [order] = useState(() => shuffle(photos))
  const [active, setActive] = useState<number | null>(null)

  return (
    <>
      <div className="columns-2 gap-2 sm:columns-3">
        {order.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Open photo ${index + 1} of ${order.length}`}
            className="group relative mb-2 block w-full cursor-pointer break-inside-avoid overflow-hidden rounded-lg bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
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

      {active !== null && (
        <PhotoViewer
          key={order[active].src}
          photo={order[active]}
          caption={captionMap[order[active].file] ?? ''}
          onClose={() => setActive(null)}
        />
      )}
    </>
  )
}
