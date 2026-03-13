import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";
import { metaImagesPlugin } from "./vite-plugin-meta-images";

/*
Fix for __dirname in ESM projects
*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    metaImagesPlugin(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(rootDir, "client/src"),
      "@shared": path.resolve(rootDir, "shared"),
      "@assets": path.resolve(rootDir, "attached_assets"),
    },
  },

  css: {
    postcss: {
      plugins: [],
    },
  },

  root: path.resolve(rootDir, "client"),

  build: {
    outDir: path.resolve(rootDir, "dist/public"),
    emptyOutDir: true,

    /*
    Improves production build performance
    */
    target: "esnext",

    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],

          "vendor-ui": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-select",
            "@radix-ui/react-popover",
            "@radix-ui/react-accordion",
            "framer-motion",
          ],

          "vendor-maps": ["leaflet", "react-leaflet"],

          "vendor-charts": ["recharts"],

          "vendor-forms": ["react-hook-form", "@hookform/resolvers"],
        },
      },
    },
  },

  server: {
    host: "0.0.0.0",
    allowedHosts: true,

    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});