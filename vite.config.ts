import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    build: {
      outDir: 'dist',
      sourcemap: true
    },
    server: {
      port: 3000
    },
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(
        mode === 'production'
          ? 'https://real-estate-automation-project-rae0fqxn5.vercel.app'
          : 'http://localhost:3000'
      )
    }
  };
});
