import { useCallback, useEffect, useRef, useState } from 'react'
import type { Photo } from 'virtual:photos'

const MIN_SCALE = 1
const MAX_SCALE = 5
const ZOOM_STEP = 1.4

const clampScale = (value: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, value))

const controlClass =
  'flex h-9 min-w-9 items-center justify-center rounded-full bg-white/10 px-3 text-sm text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60'

interface PhotoViewerProps {
  photo: Photo
  caption: string
  onClose: () => void
}

export default function PhotoViewer({ photo, caption, onClose }: PhotoViewerProps) {
  const areaRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const pointers = useRef(new Map<number, { x: number; y: number }>())
  const pinch = useRef<{ distance: number; scale: number } | null>(null)
  const dragged = useRef(false)
  const startedOnImage = useRef(false)
  const start = useRef<{ x: number; y: number } | null>(null)

  const [scale, setScale] = useState(MIN_SCALE)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const reset = useCallback(() => {
    setScale(MIN_SCALE)
    setOffset({ x: 0, y: 0 })
  }, [])

  const applyScale = useCallback((value: number) => {
    const next = clampScale(value)
    setScale(next)
    if (next === MIN_SCALE) setOffset({ x: 0, y: 0 })
  }, [])

  const zoomBy = useCallback(
    (factor: number) => {
      setScale((current) => {
        const next = clampScale(current * factor)
        if (next === MIN_SCALE) setOffset({ x: 0, y: 0 })
        return next
      })
    },
    [],
  )

  // Start from a clean view whenever a different photo is opened.
  // (The collage mounts this component fresh per photo via a `key`.)

  useEffect(() => {
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    dragged.current = false
    startedOnImage.current = (event.target as Element).tagName === 'IMG'
    start.current = { x: event.clientX, y: event.clientY }

    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()]
      pinch.current = { distance: Math.hypot(a.x - b.x, a.y - b.y), scale }
    }
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const previous = pointers.current.get(event.pointerId)
    if (!previous) return

    const next = { x: event.clientX, y: event.clientY }
    pointers.current.set(event.pointerId, next)

    if (start.current && Math.hypot(next.x - start.current.x, next.y - start.current.y) > 6) {
      dragged.current = true
    }

    // Two fingers: pinch to zoom.
    if (pointers.current.size >= 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()]
      if (pinch.current.distance > 0) {
        applyScale(pinch.current.scale * (Math.hypot(a.x - b.x, a.y - b.y) / pinch.current.distance))
      }
      return
    }

    // One finger (or mouse) while zoomed: pan, clamped to the zoomed extent.
    if (scale > 1) {
      const area = areaRef.current?.getBoundingClientRect()
      const limitX = area ? (area.width * (scale - 1)) / 2 : 0
      const limitY = area ? (area.height * (scale - 1)) / 2 : 0
      setOffset((current) => ({
        x: Math.min(limitX, Math.max(-limitX, current.x + (next.x - previous.x))),
        y: Math.min(limitY, Math.max(-limitY, current.y + (next.y - previous.y))),
      }))
    }
  }

  const onPointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(event.pointerId)
    if (pointers.current.size < 2) pinch.current = null
  }

  const onAreaClick = () => {
    if (!dragged.current && !startedOnImage.current) onClose()
  }

  const onAreaDoubleClick = () => {
    if (scale > 1) reset()
    else applyScale(2.5)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-50 flex flex-col bg-black/95"
    >
      <div
        ref={areaRef}
        className="relative flex flex-1 touch-none items-center justify-center overflow-hidden"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onClick={onAreaClick}
        onDoubleClick={onAreaDoubleClick}
      >
        <img
          src={photo.src}
          alt={caption || 'Photo'}
          draggable={false}
          className="max-h-full max-w-full origin-center select-none object-contain"
          style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})` }}
        />
      </div>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close viewer"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl leading-none text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      >
        ×
      </button>

      <div className="flex flex-col items-center gap-3 px-6 pb-6 pt-3">
        {caption && <p className="max-w-2xl text-center text-sm text-neutral-300">{caption}</p>}
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => zoomBy(1 / ZOOM_STEP)} aria-label="Zoom out" className={controlClass}>
            −
          </button>
          <button type="button" onClick={reset} aria-label="Reset zoom" className={controlClass}>
            {Math.round(scale * 100)}%
          </button>
          <button type="button" onClick={() => zoomBy(ZOOM_STEP)} aria-label="Zoom in" className={controlClass}>
            +
          </button>
        </div>
      </div>
    </div>
  )
}
