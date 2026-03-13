import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { metaImagesPlugin } from "./vite-plugin-meta-images";

// Root directory (safe for Node + CJS)
const rootDir = __dirname;

export default defineConfig({
  base:"/",
  plugins: [
    react(),
    runtimeErrorOverlay(),
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