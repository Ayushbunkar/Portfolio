import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [tailwindcss(), react()],

  build: {
    // Raise chunk size warning threshold — three.js is large by design
    chunkSizeWarningLimit: 1200,

    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split large libraries into separate cacheable chunks
          if (id.includes('node_modules/three')) return 'three'
          if (id.includes('node_modules/gsap')) return 'gsap'
          if (id.includes('node_modules/framer-motion')) return 'framer-motion'
          if (id.includes('node_modules/lenis')) return 'lenis'
          if (id.includes('node_modules/react-icons')) return 'react-icons'
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) return 'react'
        },
      },
    },

    // Use esbuild for fastest minification (default in Vite 5)
    minify: 'esbuild',

    // Remove console.* and debugger in production
    esbuildOptions: {
      drop: ['console', 'debugger'],
    },
  },

  // Enable CSS code splitting
  css: {
    devSourcemap: false,
  },
})
