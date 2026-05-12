"use client";

import { Phone, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Store } from "@/types/store";

type StoreDetailDrawerProps = {
  store: Store | null;
  onClose: () => void;
};

export function StoreDetailDrawer({ store, onClose }: StoreDetailDrawerProps) {
  if (!store) return null;

  return (
    <div className="fixed inset-0 z-50 bg-ink/35" role="dialog" aria-modal="true" aria-label={`${store.name} details`}>
      <div className="absolute bottom-0 left-0 right-0 max-h-[82vh] overflow-y-auto rounded-t-[1.75rem] bg-pearl p-5 shadow-soft lg:bottom-auto lg:left-auto lg:right-8 lg:top-8 lg:w-[420px] lg:rounded-[1.5rem]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge tone={store.openNow ? "success" : "neutral"}>{store.openNow ? "Open now" : "Closed today"}</Badge>
            <h2 className="mt-3 text-2xl font-bold text-ink">{store.name}</h2>
            <p className="mt-2 text-sm text-ink/65">{store.address}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close store details"
            className="rounded-full bg-white p-2 text-ink shadow-sm"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl bg-white p-3">
            <strong className="block text-lg">{store.distanceKm}</strong>
            <span className="text-xs text-ink/60">km</span>
          </div>
          <div className="rounded-2xl bg-white p-3">
            <strong className="block text-lg">{store.rating}</strong>
            <span className="text-xs text-ink/60">rating</span>
          </div>
          <div className="rounded-2xl bg-white p-3">
            <strong className="block text-lg">{store.closingTime}</strong>
            <span className="text-xs text-ink/60">closes</span>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-sm font-bold uppercase tracking-wide text-rosewood">Available services</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {store.services.map((service) => (
              <Badge key={service}>{service}</Badge>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          <Button type="button">Book appointment</Button>
          <Button type="button" variant="secondary">
            <Phone className="h-4 w-4" />
            Call salon
          </Button>
        </div>
      </div>
    </div>
  );
}
