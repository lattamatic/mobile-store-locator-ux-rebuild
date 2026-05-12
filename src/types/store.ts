export type StoreService = "Color" | "Cut" | "Blowout" | "Skincare" | "Brow Bar";

export type Store = {
  id: string;
  name: string;
  city: string;
  postalCode: string;
  address: string;
  distanceKm: number;
  openNow: boolean;
  closingTime: string;
  services: StoreService[];
  rating: number;
  phone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};
