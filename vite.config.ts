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

  publicDir: path.resolve(rootDir, "client/public"),

  assetsInclude: ["**/*.mp4", "**/*.webm", "**/*.ogg", "**/*.jpg", "**/*.png", "**/*.svg", "**/*.gif"],

  build: {
    outDir: path.resolve(rootDir, "dist/public"),
    emptyOutDir: true,
    copyPublicDir: true,

    modulePreload: {
      resolveDependencies: (_filename, deps) =>
        deps.filter((d) => !d.includes("vendor-charts") && !d.includes("vendor-maps")),
    },

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