declare namespace google {
  namespace maps {
    class Map {
      constructor(container: HTMLDivElement, options: MapOptions);
      fitBounds(bounds: LatLngBounds, padding?: number): void;
      getZoom(): number;
      setZoom(zoom: number): void;
    }

    class Marker {
      constructor(options: MarkerOptions);
      addListener(eventName: string, callback: () => void): void;
      getPosition(): LatLng | null;
    }

    class InfoWindow {
      constructor(options: InfoWindowOptions);
      open(map: Map, marker?: Marker): void;
      close(): void;
    }

    class LatLngBounds {
      extend(latlng: LatLng): void;
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

    interface MarkerOptions {
      position?: { lat: number; lng: number };
      map?: Map;
      title?: string;
    }

    interface InfoWindowOptions {
      content?: string;
      ariaLabel?: string;
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
