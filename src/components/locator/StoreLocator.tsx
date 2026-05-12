"use client";

import { useMemo, useState } from "react";
import rawStores from "@/data/stores.json";
import { filterStores, type StoreFilters } from "@/lib/store-utils";
import type { Store } from "@/types/store";
import { FilterBar } from "./FilterBar";
import { MapPanel } from "./MapPanel";
import { SearchBar } from "./SearchBar";
import { StatePanel } from "./StatePanel";
import { StoreCard } from "./StoreCard";
import { StoreDetailDrawer } from "./StoreDetailDrawer";

const stores = rawStores as Store[];

export default function StoreLocator() {
  const [filters, setFilters] = useState<StoreFilters>({
    query: "",
    service: "All",
    openNow: false,
    maxDistance: 10
  });
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const filteredStores = useMemo(() => filterStores(stores, filters), [filters]);

  function updateFilters(nextFilters: StoreFilters) {
    setShowError(false);
    setShowLoading(true);
    setFilters(nextFilters);
    window.setTimeout(() => setShowLoading(false), 250);
  }

  function simulateNearMe() {
    updateFilters({ ...filters, query: "75003", maxDistance: 3, openNow: true });
  }

  return (
    <main className="min-h-screen bg-pearl">
      <section className="mx-auto max-w-7xl px-4 py-5 lg:px-8 lg:py-8">
        <header className="mb-5">
          <p className="text-sm font-bold uppercase tracking-wide text-rosewood">Product Owner case study</p>
          <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-ink lg:text-5xl">Mobile Store Locator UX Rebuild</h1>
              <p className="mt-2 max-w-2xl text-base text-ink/65">
                A map-first salon discovery flow designed for faster decisions on high-volume mobile traffic.
              </p>
            </div>
            <button
              className="self-start rounded-full border border-champagne bg-white px-4 py-2 text-sm font-semibold text-rosewood"
              type="button"
              onClick={() => setShowError((value) => !value)}
            >
              Toggle error state
            </button>
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-[420px_1fr] lg:items-start">
          <aside className="space-y-4 lg:sticky lg:top-6">
            <SearchBar query={filters.query} onQueryChange={(query) => updateFilters({ ...filters, query })} onNearMe={simulateNearMe} />
            <FilterBar filters={filters} onChange={updateFilters} />

            <div className="hidden rounded-[1.25rem] border border-champagne bg-white p-4 lg:block">
              <h2 className="text-sm font-bold uppercase tracking-wide text-rosewood">Why this layout wins</h2>
              <p className="mt-2 text-sm leading-6 text-ink/65">
                The map and filters stay close to the decision moment, while the list is sorted by distance to reduce comparison effort.
              </p>
            </div>
          </aside>

          <section className="space-y-4">
            <MapPanel stores={filteredStores} selectedStoreId={selectedStore?.id} onSelectStore={setSelectedStore} />

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-ink">Nearest salons</h2>
                <p className="text-sm text-ink/60">Sorted by distance for quick decision making</p>
              </div>
              <span className="rounded-full bg-blush px-3 py-1 text-sm font-bold text-rosewood">{filteredStores.length} results</span>
            </div>

            {showError ? (
              <StatePanel title="We could not refresh locations" message="Keep the last known results visible and offer a quick retry in a production build." />
            ) : showLoading ? (
              <StatePanel title="Finding nearby salons" message="A short loading state reassures users that search and filters are responding." />
            ) : filteredStores.length === 0 ? (
              <StatePanel title="No salons match these filters" message="Try a wider distance or remove one service filter to recover results quickly." />
            ) : (
              <div className="grid gap-3 lg:grid-cols-2">
                {filteredStores.map((store) => (
                  <StoreCard key={store.id} store={store} selected={selectedStore?.id === store.id} onSelect={setSelectedStore} />
                ))}
              </div>
            )}
          </section>
        </div>
      </section>

      <StoreDetailDrawer store={selectedStore} onClose={() => setSelectedStore(null)} />
    </main>
  );
}
