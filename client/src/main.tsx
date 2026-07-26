import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

// The server stamps a canonical tag into the raw HTML (see server/static.ts) so crawlers
// see one before any JS runs. Remove it here, before mount, so the SEO component's own
// Helmet-managed canonical is the only one left in the DOM once React takes over.
document.head.querySelector('[data-ssr-canonical]')?.remove();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);
