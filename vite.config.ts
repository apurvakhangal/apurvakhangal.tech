import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core — cached very aggressively
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          // Framer Motion — large, rarely changes
          "vendor-framer": ["framer-motion"],
          // Three.js + React Three Fiber — large 3D stack
          "vendor-three": ["three", "@react-three/fiber"],
          // GSAP — animation engine for horizontal scroll
          "vendor-gsap": ["gsap"],
        },
      },
    },
    // Raise warning threshold — three.js split is already chunked above
    chunkSizeWarningLimit: 600,
  },
});