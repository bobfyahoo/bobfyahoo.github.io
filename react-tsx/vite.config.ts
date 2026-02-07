import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
      // 2. Helps with CSP: tells Vite NOT to inject the module loader inline
      modulePreload: {
        polyfill: false
      },
      // 3. Ensures CSS is its own file and not injected as a script string
      cssCodeSplit: true,
    }
})
