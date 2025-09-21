import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Tell Vite where our source code is.
  root: 'src',
  
  publicDir: resolve(__dirname, 'public'),
  
  build: {
    // This is the folder where Vite will put the built files.
    // We want it to be in the main project folder, not inside `src`.
    outDir: resolve(__dirname, 'dist'),
    // Ensure the output directory is empty before building
    emptyOutDir: true,
  },
  
  // This is needed to make sure asset paths work correctly
  // when the root is inside a subdirectory.
  resolve: {
    alias: {
      '/': resolve(__dirname, 'src')
    }
  }
});