import { copyFileSync, existsSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

function copyCpanelFiles() {
  return {
    name: 'copy-cpanel-files',
    closeBundle() {
      const source = fileURLToPath(new URL('./public/.htaccess', import.meta.url))
      const target = fileURLToPath(new URL('./dist/.htaccess', import.meta.url))

      if (existsSync(source)) {
        copyFileSync(source, target)
      }
    },
  }
}

export default defineConfig(({ command }) => ({
  plugins: [
    tailwindcss(),
    vue(),
    command === 'serve' ? vueDevTools() : null,
    command === 'build' ? copyCpanelFiles() : null,
  ].filter(Boolean),
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return
          }

          if (id.includes('vue-router')) {
            return 'router'
          }

          if (id.includes('lucide-vue-next')) {
            return 'icons'
          }

          if (id.includes('/vue/') || id.includes('\\vue\\') || id.includes('@vue')) {
            return 'framework'
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}))
