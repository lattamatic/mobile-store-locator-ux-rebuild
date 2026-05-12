"use client";

import { SlidersHorizontal } from "lucide-react";
import { Chip } from "@/components/ui/Chip";
import { services, type StoreFilters } from "@/lib/store-utils";
import type { StoreService } from "@/types/store";

type FilterBarProps = {
  filters: StoreFilters;
  onChange: (filters: StoreFilters) => void;
};

export function FilterBar({ filters, onChange }: FilterBarProps) {
  return (
    <section className="sticky top-0 z-20 -mx-4 border-y border-champagne/70 bg-pearl/95 px-4 py-3 backdrop-blur lg:static lg:mx-0 lg:rounded-[1.25rem] lg:border lg:bg-white">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink">
          <SlidersHorizontal className="h-4 w-4 text-rosewood" />
          Refine
        </div>
        <button
          className="text-sm font-semibold text-rosewood"
          onClick={() => onChange({ query: filters.query, service: "All", openNow: false, maxDistance: 10 })}
          type="button"
        >
          Reset
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {services.map((service) => (
          <Chip
            key={service}
            active={filters.service === service}
            onClick={() => onChange({ ...filters, service: service as StoreService | "All" })}
            type="button"
          >
            {service}
          </Chip>
        ))}
        <Chip active={filters.openNow} onClick={() => onChange({ ...filters, openNow: !filters.openNow })} type="button">
          Open now
        </Chip>
      </div>

      <label className="mt-3 block text-xs font-semibold uppercase tracking-wide text-rosewood" htmlFor="distance">
        Within {filters.maxDistance} km
      </label>
      <input
        id="distance"
        type="range"
        min="1"
        max="10"
        value={filters.maxDistance}
        onChange={(event) => onChange({ ...filters, maxDistance: Number(event.target.value) })}
        className="mt-2 w-full accent-rosewood"
      />
    </section>
  );
}
