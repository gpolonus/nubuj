
import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    "background_color": "#ffffff",
    "theme_color": "#333333",
    "name": "NuBuj",
    "short_name": "NuBuj",
    "display": "minimal-ui",
    "start_url": "/",
    "icons": [
      {
        "src": "icon-192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "icon-512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ]
  }
}
