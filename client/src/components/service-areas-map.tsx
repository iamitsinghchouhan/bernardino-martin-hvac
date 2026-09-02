import { useEffect, useRef } from 'react';
import { CITIES, CITY_PAGE_LINKS } from "@/lib/constants";

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
  "Lennox": { lat: 33.9381, lng: -118.3576 }
};

export function ServiceAreasMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

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

      // Create markers for all cities
      const bounds = new window.google.maps.LatLngBounds();
      
      CITIES.forEach((city) => {
        const coords = cityCoordinates[city];
        if (!coords) return;

        const marker = new window.google.maps.Marker({
          position: { lat: coords.lat, lng: coords.lng },
          map: map.current!,
          title: city,
        });

        // Extend bounds to include this marker
        bounds.extend(marker.getPosition()!);

        // Add click listener for info window
        marker.addListener('click', () => {
          // Close previous info window if exists
          if (infoWindowRef.current) {
            infoWindowRef.current.close();
          }

          const servicePageUrl = CITY_PAGE_LINKS[city] ?? "/service-areas";
          const content = `
            <div class="font-sans">
              <div class="text-center font-bold text-slate-900">${city}</div>
              <div class="text-xs text-blue-600 mt-1">
                <a href="${servicePageUrl}" class="underline hover:text-blue-800">
                  View ${city} Service Page
                </a>
              </div>
            </div>
          `;

          infoWindowRef.current = new window.google.maps.InfoWindow({
            content: content,
            ariaLabel: city,
          });

          if (map.current) {
            infoWindowRef.current.open(map.current, marker);
          }
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
  }, []);

  return (
    <div className="mb-20 relative w-full max-w-5xl mx-auto h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl border border-slate-200">
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
