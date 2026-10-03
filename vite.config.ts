import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { metaImagesPlugin } from "./vite-plugin-meta-images";
import { deferCssPlugin } from "./vite-plugin-defer-css";

// Root directory (safe for Node + CJS)
const rootDir = __dirname;

export default defineConfig({
  base:"/",
  plugins: [
    react(),
    runtimeErrorOverlay(),
    tailwindcss(),
    metaImagesPlugin(),
    deferCssPlugin(),
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

  // Without this, Vite looks for .env files inside `root` (client/) instead of the repo root,
  // so VITE_*-prefixed vars defined in the real .env never reach import.meta.env at build time.
  envDir: rootDir,

  publicDir: path.resolve(rootDir, "client/public"),

  assetsInclude: ["**/*.mp4", "**/*.webm", "**/*.ogg", "**/*.jpg", "**/*.png", "**/*.svg", "**/*.gif"],

  build: {
    outDir: path.resolve(rootDir, "dist/public"),
    emptyOutDir: true,
    copyPublicDir: true,

    rollupOptions: {
      output: {
        // Only group the truly-shared core that nearly every route needs. Heavy, single-use
        // libraries (recharts → admin analytics) are intentionally NOT force-grouped: doing so
        // pulled their shared sub-deps (e.g. react-is) into a big named chunk that the homepage
        // then had to load. Letting Vite split naturally keeps recharts (~106KB) in its own lazy
        // chunk and puts small shared utils in a tiny common chunk instead.
        //
        // Tried un-grouping the Radix UI primitives the same way (most routes only use one or
        // two of the eight packages, so Lighthouse measured 77% of "vendor-ui" as unused JS on
        // the homepage) — but without real route-level code-splitting, Vite had nowhere else to
        // put them, so they landed back in the main entry chunk instead, making IT bigger and
        // measurably slowing hydration (and therefore LCP, since the real hero only paints once
        // React mounts) under mobile CPU throttling. Keeping them in their own chunk is the
        // lesser cost until routes are actually lazy-split.
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