import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './react-tsx/', // 1. Ensures all asset paths are relative, which is crucial for iframe embedding
  build: {
      // 2. Helps with CSP: tells Vite NOT to inject the module loader inline
      modulePreload: {
        polyfill: false
      },
      // 3. Ensures CSS is its own file and not injected as a script string
      cssCodeSplit: true,
      // This will build directly into a folder the parent index.html can see
      // Adjust '../../react-bin' to point to your desired deployment folder
      outDir: '../react-tsx', 
      emptyOutDir: true, // Clears the old build before creating a new one
    }
})
