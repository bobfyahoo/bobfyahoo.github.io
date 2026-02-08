import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: 'vuevite/', // 1. Ensures all asset paths are relative, which is crucial for iframe embedding
  build: {
      // 2. Helps with CSP: tells Vite NOT to inject the module loader inline
      modulePreload: {
        polyfill: false
      },
      // Prevents Vite from injecting small CSS strings into the HTML
      assetsInlineLimit: 0,
      // 3. Ensures CSS is its own file and not injected as a script string
      cssCodeSplit: true,
      // This will build directly into a folder the parent index.html can see
      // Adjust './public/vuevite' to point to your desired deployment folder
      outDir: '../public/vuevite', 
      emptyOutDir: true, // Clears the old build before creating a new one
    }
})
