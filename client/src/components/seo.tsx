import { useEffect } from "react";
import { useLocation } from "wouter";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
}

export function SEO({ title, description, canonical, noindex = false }: SEOProps) {
  const [location] = useLocation();

  useEffect(() => {
    // Update Title
    document.title = `${title} | BERNARDINO MARTIN Heating • Air Conditioning • Solar`;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // Update Canonical URL — fixed domain
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute(
      "href",
      canonical || `https://bernardinomartinhvac.com${location}`
    );

    // Handle Robots meta tag
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      document.head.appendChild(metaRobots);
    }
    if (noindex) {
      metaRobots.setAttribute("content", "noindex, nofollow");
    } else {
      metaRobots.setAttribute("content", "index, follow");
    }
  }, [title, description, canonical, location, noindex]);

  return null;
}