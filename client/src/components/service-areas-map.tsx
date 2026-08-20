import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { CITIES, CITY_PAGE_LINKS } from "@/lib/constants";
import { Link } from "wouter";

// Self-hosted marker assets (were loaded from cdnjs + raw.githubusercontent.com, which had a 5-minute
// cache TTL and counted as third-party requests). Served from our own /images/leaflet with long cache.
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/leaflet/marker-icon-2x.png',
  iconUrl: '/images/leaflet/marker-icon.png',
  shadowUrl: '/images/leaflet/marker-shadow.png',
});

const customIcon = new L.Icon({
  iconUrl: '/images/leaflet/marker-icon-2x-blue.png',
  shadowUrl: '/images/leaflet/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const cityCoordinates: Record<string, [number, number]> = {
  "Malibu": [34.0259, -118.7798],
  "Burbank": [34.1808, -118.3090],
  "Gardena": [33.8883, -118.3090],
  "Glendale": [34.1425, -118.2551],
  "Torrance": [33.8358, -118.3406],
  "Hawthorne": [33.9164, -118.3526],
  "Inglewood": [33.9617, -118.3531],
  "El Segundo": [33.9192, -118.4165],
  "Long Beach": [33.7701, -118.1937],
  "Culver City": [34.0211, -118.3965],
  "Los Angeles": [34.0522, -118.2437],
  "Santa Monica": [34.0195, -118.4912],
  "Hermosa Beach": [33.8622, -118.3995],
  "Redondo Beach": [33.8492, -118.3884],
  "West Hollywood": [34.0900, -118.3617],
  "Manhattan Beach": [33.8847, -118.4109],
  "San Fernando Valley": [34.2083, -118.5365],
  "Playa Del Rey": [33.9575, -118.4484],
  "Hollywood": [34.0928, -118.3287],
  "Pasadena": [34.1478, -118.1445],
  "North Hollywood": [34.1870, -118.3813],
  "Van Nuys": [34.1867, -118.4487],
  "Chatsworth": [34.2572, -118.5992],
  "Northridge": [34.2381, -118.5292],
  "Reseda": [34.2011, -118.5353],
  "Canoga Park": [34.2011, -118.5989],
  "Woodland Hills": [34.1684, -118.6059],
  "Calabasas": [34.1367, -118.6615],
  "Sherman Oaks": [34.1508, -118.4489],
  "Studio City": [34.1408, -118.3965],
  "Encino": [34.1592, -118.5079],
  "Tarzana": [34.1730, -118.5531],
  "West Hills": [34.2011, -118.6431],
  "Westchester": [33.9622, -118.4011],
  "Lennox": [33.9381, -118.3576]
};

export function ServiceAreasMap() {
  const center: [number, number] = [33.98, -118.35];

  return (
    <div className="mb-20 relative w-full max-w-5xl mx-auto h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl border border-slate-200">
      <MapContainer 
        center={center} 
        zoom={10} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {CITIES.map((city) => {
          const coords = cityCoordinates[city];
          if (!coords) return null;
          return (
            <Marker key={city} position={coords} icon={customIcon}>
              <Popup className="font-sans">
                <div className="text-center font-bold">{city}</div>
                <div className="text-xs text-primary mt-1">
                  <Link href={CITY_PAGE_LINKS[city] ?? "/service-areas"}>View {city} Service Page</Link>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      <div className="absolute bottom-4 left-4 right-4 z-[400] pointer-events-none">
        <div className="text-center text-xs text-slate-700 font-bold bg-white/90 backdrop-blur shadow-md px-4 py-2 rounded-lg max-w-sm mx-auto pointer-events-auto">
          Greater Los Angeles Coverage Map &bull; Real-time Service Dispatch
        </div>
      </div>
    </div>
  );
}
