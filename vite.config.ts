import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: 'firebaseConfig', replacement: path.resolve(__dirname, 'src/path/to/firebaseConfig') },
    ],
  },
  build: {
    target: 'es2015',  // Garantiza la compatibilidad con navegadores.
  },
});
