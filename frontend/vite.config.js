import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Tailwind Vite plugin removed — project uses plain CSS in src/App.css.
// If you want Tailwind, install and configure it separately (see README).
export default defineConfig({
  plugins: [react()],
})
