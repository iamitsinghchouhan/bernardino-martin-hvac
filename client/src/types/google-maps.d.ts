declare namespace google {
  namespace maps {
    class Map {
      constructor(container: HTMLDivElement, options: MapOptions);
      fitBounds(bounds: LatLngBounds, padding?: number): void;
      getZoom(): number;
      setZoom(zoom: number): void;
      addListener(eventName: string, callback: () => void): void;
      panTo(latLng: LatLng | { lat: number; lng: number }): void;
    }

    class Marker {
      constructor(options: MarkerOptions);
      addListener(eventName: string, callback: () => void): void;
      getPosition(): LatLng | null;
      setIcon(icon: Symbol | string): void;
    }

    class InfoWindow {
      constructor(options?: InfoWindowOptions);
      open(options: Map | { map: Map; anchor?: Marker }, marker?: Marker): void;
      close(): void;
      setContent(content: string): void;
    }

    class LatLngBounds {
      extend(latlng: LatLng): void;
    }

    class Point {
      constructor(x: number, y: number);
    }

    interface LatLng {
      lat(): number;
      lng(): number;
    }

    interface MapOptions {
      center?: { lat: number; lng: number };
      zoom?: number;
      mapTypeControl?: boolean;
      fullscreenControl?: boolean;
      zoomControl?: boolean;
      streetViewControl?: boolean;
    }

    interface Symbol {
      path: string;
      fillColor?: string;
      fillOpacity?: number;
      strokeColor?: string;
      strokeWeight?: number;
      scale?: number;
      anchor?: Point;
    }

    interface MarkerOptions {
      position?: { lat: number; lng: number };
      map?: Map;
      title?: string;
      icon?: Symbol | string;
    }

    interface InfoWindowOptions {
      content?: string;
      ariaLabel?: string;
      maxWidth?: number;
    }

    namespace event {
      function addListener(
        instance: any,
        eventName: string,
        handler: () => void
      ): void;
      function removeListener(listener: any): void;
    }
  }
}

interface Window {
  google?: typeof google;
}
