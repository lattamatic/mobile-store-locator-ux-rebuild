"use client";

import { ArrowRight, Clock, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Store } from "@/types/store";

type StoreCardProps = {
  store: Store;
  selected?: boolean;
  onSelect: (store: Store) => void;
};

export function StoreCard({ store, selected, onSelect }: StoreCardProps) {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${store.coordinates.lat},${store.coordinates.lng}`;

  return (
    <article
      className={`rounded-[1.25rem] border bg-white p-4 shadow-sm transition ${
        selected ? "border-ink shadow-soft" : "border-champagne"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-ink">{store.name}</h3>
          <p className="mt-1 text-sm text-ink/65">{store.address}</p>
        </div>
        <Badge tone={store.openNow ? "success" : "neutral"}>{store.openNow ? "Open" : "Closed"}</Badge>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-sm text-ink/70">
        <span className="inline-flex items-center gap-1">
          <Navigation className="h-4 w-4 text-rosewood" />
          {store.distanceKm} km
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="h-4 w-4 text-rosewood" />
          Until {store.closingTime}
        </span>
        <span>{store.rating} rating</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {store.services.slice(0, 3).map((service) => (
          <Badge key={service}>{service}</Badge>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <Button className="flex-1" type="button" onClick={() => onSelect(store)}>
          View details
          <ArrowRight className="h-4 w-4" />
        </Button>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-champagne bg-white px-3 text-ink transition hover:border-rosewood"
          aria-label={`Get directions to ${store.name}`}
        >
          <Navigation className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}
