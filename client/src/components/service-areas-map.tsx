import { useEffect, useRef, useState } from 'react';
import { CITIES, CITY_PAGE_LINKS } from "@/lib/constants";
import allCities from "@/data/cities/all-cities";
import type { CityData } from "@/data/cities/types";

const cityCoordinates: Record<string, { lat: number; lng: number }> = {
  "Malibu": { lat: 34.0259, lng: -118.7798 },
  "Burbank": { lat: 34.1808, lng: -118.3090 },
  "Beverly Hills": { lat: 34.0901, lng: -118.4065 },
  "Gardena": { lat: 33.8883, lng: -118.3090 },
  "Glendale": { lat: 34.1425, lng: -118.2551 },
  "Torrance": { lat: 33.8358, lng: -118.3406 },
  "Hawthorne": { lat: 33.9164, lng: -118.3526 },
  "Inglewood": { lat: 33.9617, lng: -118.3531 },
  "El Segundo": { lat: 33.9192, lng: -118.4165 },
  "Long Beach": { lat: 33.7701, lng: -118.1937 },
  "Culver City": { lat: 34.0211, lng: -118.3965 },
  "Los Angeles": { lat: 34.0522, lng: -118.2437 },
  "Santa Monica": { lat: 34.0195, lng: -118.4912 },
  "Hermosa Beach": { lat: 33.8622, lng: -118.3995 },
  "Redondo Beach": { lat: 33.8492, lng: -118.3884 },
  "West Hollywood": { lat: 34.0900, lng: -118.3617 },
  "Manhattan Beach": { lat: 33.8847, lng: -118.4109 },
  "San Fernando Valley": { lat: 34.2083, lng: -118.5365 },
  "Playa del Rey": { lat: 33.9575, lng: -118.4484 },
  "Hollywood": { lat: 34.0928, lng: -118.3287 },
  "Pasadena": { lat: 34.1478, lng: -118.1445 },
  "North Hollywood": { lat: 34.1870, lng: -118.3813 },
  "Van Nuys": { lat: 34.1867, lng: -118.4487 },
  "Chatsworth": { lat: 34.2572, lng: -118.5992 },
  "Northridge": { lat: 34.2381, lng: -118.5292 },
  "Reseda": { lat: 34.2011, lng: -118.5353 },
  "Canoga Park": { lat: 34.2011, lng: -118.5989 },
  "Woodland Hills": { lat: 34.1684, lng: -118.6059 },
  "Calabasas": { lat: 34.1367, lng: -118.6615 },
  "Sherman Oaks": { lat: 34.1508, lng: -118.4489 },
  "Studio City": { lat: 34.1408, lng: -118.3965 },
  "Encino": { lat: 34.1592, lng: -118.5079 },
  "Tarzana": { lat: 34.1730, lng: -118.5531 },
  "West Hills": { lat: 34.2011, lng: -118.6431 },
  "Westchester": { lat: 33.9622, lng: -118.4011 },
  "Lennox": { lat: 33.9381, lng: -118.3576 },
  "San Fernando": { lat: 34.2817, lng: -118.4389 },
  "Yorba Linda": { lat: 33.8886, lng: -117.8131 },
};

// Classic map-pin silhouette (teardrop), used as a scalable/recolorable vector icon instead of
// a flat image file — lets the selected state resize and recolor with no extra asset.
const PIN_PATH =
  "M12 0C7.03 0 3 4.03 3 9c0 6.75 9 15 9 15s9-8.25 9-15c0-4.97-4.03-9-9-9zm0 12.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z";

function pinIcon(selected: boolean): google.maps.Symbol {
  return {
    path: PIN_PATH,
    fillColor: selected ? "#f0702a" : "#2e4a66",
    fillOpacity: 1,
    strokeColor: "#ffffff",
    strokeWeight: 1.5,
    scale: selected ? 2.1 : 1.3,
    anchor: new google.maps.Point(12, 24),
  };
}

function cityByName(name: string): CityData | undefined {
  return (allCities as CityData[]).find((c) => c.city === name);
}

function popupContent(cityName: string, data: CityData | undefined, pageUrl: string): string {
  const servicesLine = data?.commonServices?.slice(0, 2).join(" &bull; ") ?? "HVAC &bull; Solar &bull; Plumbing";
  const responseTime = data?.responseTime ?? "Fast";

  // Deliberately compact — this has to fit inside a ~400-500px-tall map container above a
  // marker that could sit anywhere in it, and Google's InfoWindow always opens above its
  // anchor (never flips below), so there's no recovering from content that's simply too tall.
  return `
    <div style="font-family:Inter,sans-serif;width:240px;max-width:75vw;">
      <div style="display:flex;align-items:center;gap:6px;">
        <span style="display:flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:9999px;background:#2e4a66;flex-shrink:0;">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="#ffffff"><path d="${PIN_PATH}"/></svg>
        </span>
        <span style="font-weight:800;font-size:14.5px;color:#0f172a;">${cityName}</span>
      </div>
      <p style="margin:6px 0 0;font-size:11.5px;line-height:1.4;color:#475569;">
        ${servicesLine} &bull; <strong>${responseTime}</strong> response
      </p>
      <a href="${pageUrl}" style="display:block;margin-top:8px;text-align:center;background:#f0702a;color:#ffffff;font-size:11.5px;font-weight:700;padding:6px 10px;border-radius:7px;text-decoration:none;">
        View ${cityName} Service Page
      </a>
    </div>
  `;
}

export function ServiceAreasMap() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const selectedMarkerRef = useRef<google.maps.Marker | null>(null);

  // The Google Maps JS API costs ~150-190 KiB plus real main-thread time, paid on every
  // homepage load regardless of whether a visitor ever scrolls this far — only start loading
  // it once the map is actually about to enter the viewport.
  const [shouldLoad, setShouldLoad] = useState(false);
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad || !mapContainer.current) return;

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      console.error('Google Maps API key is not configured. Set VITE_GOOGLE_MAPS_API_KEY in environment variables.');
      return;
    }

    // Load Google Maps API if not already loaded
    if (!window.google?.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.onload = () => initializeMap();
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    function selectMarker(marker: google.maps.Marker) {
      if (selectedMarkerRef.current && selectedMarkerRef.current !== marker) {
        selectedMarkerRef.current.setIcon(pinIcon(false));
      }
      marker.setIcon(pinIcon(true));
      selectedMarkerRef.current = marker;
    }

    function initializeMap() {
      if (!mapContainer.current || !window.google?.maps) return;

      // Initialize map with default center
      const defaultCenter = { lat: 33.98, lng: -118.35 };

      map.current = new window.google.maps.Map(mapContainer.current, {
        zoom: 10,
        center: defaultCenter,
        mapTypeControl: true,
        fullscreenControl: true,
        zoomControl: true,
        streetViewControl: false,
      });

      infoWindowRef.current = new window.google.maps.InfoWindow({ maxWidth: 300 });

      // Clicking empty map area clears the selected marker's highlighted state.
      map.current.addListener('click', () => {
        if (selectedMarkerRef.current) {
          selectedMarkerRef.current.setIcon(pinIcon(false));
          selectedMarkerRef.current = null;
        }
      });

      // Create markers for all cities
      const bounds = new window.google.maps.LatLngBounds();

      CITIES.forEach((city) => {
        const coords = cityCoordinates[city];
        if (!coords) return;

        const marker = new window.google.maps.Marker({
          position: { lat: coords.lat, lng: coords.lng },
          map: map.current!,
          title: city,
          icon: pinIcon(false),
        });

        bounds.extend(marker.getPosition()!);

        const servicePageUrl = CITY_PAGE_LINKS[city] ?? "/service-areas";
        const content = popupContent(city, cityByName(city), servicePageUrl);

        function openPopup(recenter: boolean) {
          if (!infoWindowRef.current || !map.current) return;
          // Markers near the top of the map have little room above them for the popup, which
          // can then get clipped by the rounded-corner container's overflow-hidden. Re-centering
          // the map on the marker first (only for a deliberate click, not a casual hover) reduces
          // how often that happens, without waiting on pan-animation timing that's proven
          // unreliable to gate on here.
          if (recenter) {
            map.current.panTo(marker.getPosition()!);
          }
          infoWindowRef.current.setContent(content);
          infoWindowRef.current.open({ map: map.current, anchor: marker });
        }

        // Hover shows the popup without pinning the "selected" (bigger/orange) state.
        marker.addListener('mouseover', () => openPopup(false));
        marker.addListener('mouseout', () => {
          if (selectedMarkerRef.current !== marker) {
            infoWindowRef.current?.close();
          }
        });

        // Click pins the popup open and highlights this marker as selected.
        marker.addListener('click', () => {
          selectMarker(marker);
          openPopup(true);
        });

        markersRef.current.push(marker);
      });

      // Fit all markers in view
      if (markersRef.current.length > 0) {
        map.current.fitBounds(bounds);

        // Add slight padding by adjusting zoom if needed
        const listener = window.google.maps.event.addListener(map.current, 'idle', () => {
          if (map.current!.getZoom()! > 11) {
            map.current!.setZoom(11);
          }
          window.google.maps.event.removeListener(listener);
        });
      }
    }

    // Cleanup function
    return () => {
      // Don't remove markers on unmount - they're tied to the map instance
    };
  }, [shouldLoad]);

  return (
    <div ref={wrapperRef} className="mb-20 relative w-full max-w-5xl mx-auto h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl border border-slate-200">
      <div
        ref={mapContainer}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      />

      <div className="absolute bottom-4 left-4 right-4 z-[400] pointer-events-none">
        <div className="text-center text-xs text-slate-700 font-bold bg-white/90 backdrop-blur shadow-md px-4 py-2 rounded-lg max-w-sm mx-auto pointer-events-auto">
          Greater Los Angeles Coverage Map &bull; Real-time Service Dispatch
        </div>
      </div>
    </div>
  );
}
