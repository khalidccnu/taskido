import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@base': path.resolve(__dirname, './src/@base'),
      '@lib': path.resolve(__dirname, './src/@lib'),
      '@modules': path.resolve(__dirname, './src/@modules'),
      '@styles': path.resolve(__dirname, './src/@styles'),
    },
  },
  plugins: [react()],
});
