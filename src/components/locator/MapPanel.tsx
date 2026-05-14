"use client";

import { useEffect, useRef } from "react";
import type { Store } from "@/types/store";

type LeafletMap = {
  closePopup: () => void;
  remove: () => void;
  setView: (center: [number, number], zoom: number, options?: unknown) => void;
};

type LeafletMarker = {
  addTo: (map: LeafletMap) => LeafletMarker;
  bindPopup: (content: string) => LeafletMarker;
  on: (event: string, callback: () => void) => LeafletMarker;
  setIcon: (icon: unknown) => LeafletMarker;
  remove: () => void;
};

type LeafletApi = {
  map: (
    element: HTMLElement,
    options: {
      center: [number, number];
      zoom: number;
      zoomControl: boolean;
      scrollWheelZoom: boolean;
    }
  ) => LeafletMap;
  tileLayer: (url: string, options: { attribution: string; maxZoom: number }) => { addTo: (map: LeafletMap) => void };
  marker: (coordinates: [number, number], options: { icon: unknown; title: string }) => LeafletMarker;
  divIcon: (options: { className: string; html: string; iconSize: [number, number]; iconAnchor: [number, number] }) => unknown;
  control: {
    zoom: (options: { position: string }) => { addTo: (map: LeafletMap) => void };
  };
};

declare global {
  interface Window {
    L?: LeafletApi;
  }
}

type MapPanelProps = {
  stores: Store[];
  selectedStoreId?: string;
  onSelectStore: (store: Store) => void;
};

const PARIS_CENTER: [number, number] = [48.8566, 2.3522];
const LEAFLET_CSS_ID = "leaflet-css";
const LEAFLET_SCRIPT_ID = "leaflet-script";

function loadLeaflet() {
  if (window.L) {
    return Promise.resolve(window.L);
  }

  return new Promise<LeafletApi>((resolve, reject) => {
    if (!document.getElementById(LEAFLET_CSS_ID)) {
      const link = document.createElement("link");
      link.id = LEAFLET_CSS_ID;
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    const existingScript = document.getElementById(LEAFLET_SCRIPT_ID) as HTMLScriptElement | null;
    if (existingScript) {
      existingScript.addEventListener("load", () => window.L && resolve(window.L));
      existingScript.addEventListener("error", reject);
      return;
    }

    const script = document.createElement("script");
    script.id = LEAFLET_SCRIPT_ID;
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.async = true;
    script.onload = () => (window.L ? resolve(window.L) : reject(new Error("Leaflet failed to load")));
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

function createMarkerIcon(leaflet: LeafletApi, store: Store, selected: boolean) {
  return leaflet.divIcon({
    className: "",
    html: `<button class="store-map-marker ${selected ? "store-map-marker-selected" : ""}" aria-label="${store.name}">
      <span>${store.distanceKm} km</span>
    </button>`,
    iconSize: [76, 38],
    iconAnchor: [38, 38]
  });
}

function getPopupContent(store: Store) {
  return `<strong>${store.name}</strong><br />
    ${store.address}<br />
    ${store.openNow ? "Open now" : "Closed today"} · closes ${store.closingTime}<br />
    ${store.distanceKm} km away · ${store.services.join(", ")}`;
}

export function MapPanel({ stores, selectedStoreId, onSelectStore }: MapPanelProps) {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<LeafletMarker[]>([]);
  const outsideClickHandlerRef = useRef<((event: MouseEvent) => void) | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function initialiseMap() {
      if (!mapElementRef.current || mapRef.current) return;

      const leaflet = await loadLeaflet();
      if (cancelled || !mapElementRef.current) return;

      const map = leaflet.map(mapElementRef.current, {
        center: PARIS_CENTER,
        zoom: 12,
        zoomControl: false,
        scrollWheelZoom: true
      });

      leaflet
        .tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 19
        })
        .addTo(map);

      leaflet.control.zoom({ position: "bottomright" }).addTo(map);
      mapRef.current = map;
      window.setTimeout(() => map.setView(PARIS_CENTER, 12), 0);

      const outsideClickHandler = (event: MouseEvent) => {
        const target = event.target as HTMLElement | null;
        if (!target || target.closest(".leaflet-popup, .store-map-marker, .leaflet-control")) return;
        map.closePopup();
      };
      outsideClickHandlerRef.current = outsideClickHandler;
      document.addEventListener("click", outsideClickHandler);
    }

    initialiseMap();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function renderMarkers() {
      const leaflet = await loadLeaflet();
      const map = mapRef.current;
      if (cancelled || !map) return;

      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = stores.map((store) => {
        const selected = selectedStoreId === store.id;
        const marker = leaflet
          .marker([store.coordinates.lat, store.coordinates.lng], {
            icon: createMarkerIcon(leaflet, store, selected),
            title: store.name
          })
          .addTo(map)
          .bindPopup(getPopupContent(store))
          .on("click", () => onSelectStore(store));

        return marker;
      });

      const selectedStore = stores.find((store) => store.id === selectedStoreId);
      if (selectedStore) {
        map.setView([selectedStore.coordinates.lat, selectedStore.coordinates.lng], 14, { animate: true });
      }
    }

    renderMarkers();

    return () => {
      cancelled = true;
    };
  }, [stores, selectedStoreId, onSelectStore]);

  useEffect(() => {
    return () => {
      if (outsideClickHandlerRef.current) {
        document.removeEventListener("click", outsideClickHandlerRef.current);
      }
      markersRef.current.forEach((marker) => marker.remove());
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <section className="relative h-[320px] overflow-hidden rounded-[1.5rem] border border-champagne bg-[#e8dfd3] shadow-soft lg:h-[calc(100vh-7rem)] lg:min-h-[620px]">
      <div ref={mapElementRef} className="h-full w-full" aria-label="Interactive Paris store locator map" />
      <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/95 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-rosewood shadow-sm">
        Live map
      </div>
      <div className="pointer-events-none absolute bottom-4 left-4 right-20 rounded-2xl bg-white/94 p-3 text-sm shadow-soft">
        <strong className="block text-ink">{stores.length} matching locations</strong>
        <span className="text-ink/65">Pan, zoom, or tap a marker to compare stores.</span>
      </div>
    </section>
  );
}
