import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// import dns from 'dns'
import path from 'path'

// dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: 3000,
  },
  plugins: [
    react(),
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
})
