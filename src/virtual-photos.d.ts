/**
 * Provided at build time by the `photo-manifest` plugin in vite.config.ts,
 * which scans public/photography/. Adding or removing an image there is all it
 * takes to change the gallery.
 */
declare module 'virtual:photos' {
  export interface Photo {
    /** File name inside public/photography — also the captions.json key. */
    file: string
    /** Public URL, e.g. `/photography/DSC00395.webp`. */
    src: string
    width: number
    height: number
  }

  export const photos: Photo[]
}
