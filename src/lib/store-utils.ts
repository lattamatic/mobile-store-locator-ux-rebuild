import type { Store, StoreService } from "@/types/store";

export type StoreFilters = {
  query: string;
  service: StoreService | "All";
  openNow: boolean;
  maxDistance: number;
};

export const services: Array<StoreService | "All"> = ["All", "Color", "Cut", "Blowout", "Skincare", "Brow Bar"];

export function filterStores(stores: Store[], filters: StoreFilters) {
  const query = filters.query.trim().toLowerCase();

  return stores
    .filter((store) => {
      const matchesQuery =
        !query ||
        store.city.toLowerCase().includes(query) ||
        store.postalCode.includes(query) ||
        store.name.toLowerCase().includes(query);
      const matchesService = filters.service === "All" || store.services.includes(filters.service);
      const matchesOpenNow = !filters.openNow || store.openNow;
      const matchesDistance = store.distanceKm <= filters.maxDistance;

      return matchesQuery && matchesService && matchesOpenNow && matchesDistance;
    })
    .sort((a, b) => a.distanceKm - b.distanceKm);
}
