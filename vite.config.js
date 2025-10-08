import { defineConfig } from 'vite'
import { resolve } from 'path'
import { readdirSync } from 'fs'
import handlebars from 'vite-plugin-handlebars'

// ищем все html файлы в корне
const htmlFiles = readdirSync(__dirname).filter(f => f.endsWith('.html'))

const input = htmlFiles.reduce((entries, file) => {
    const name = file.replace('.html', '')
    entries[name] = resolve(__dirname, file)
    return entries
}, {})

export default defineConfig({
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'src/partials'),
        })
    ],
    build: {
        outDir: 'dist',
        rollupOptions: {
            input
        }
    },
    server: {
        open: '/index.html'
    },
})


