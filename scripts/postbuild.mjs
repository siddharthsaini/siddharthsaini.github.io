// Runs after `vite build`.
//
// GitHub Pages has no rewrite rules, so a direct hit on a client-side route
// (e.g. /blog/lorem-ipsum) would 404. Pages serves dist/404.html for unknown
// paths, and the SPA takes over from there — copying the built index.html is
// enough because it already references the hashed bundle.

import fs from 'node:fs'

fs.copyFileSync('dist/index.html', 'dist/404.html')
console.log('postbuild: wrote dist/404.html')
