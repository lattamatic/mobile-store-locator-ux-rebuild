"use client";

import { LocateFixed, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

type SearchBarProps = {
  query: string;
  onQueryChange: (query: string) => void;
  onNearMe: () => void;
};

export function SearchBar({ query, onQueryChange, onNearMe }: SearchBarProps) {
  return (
    <div className="rounded-[1.5rem] bg-white p-3 shadow-soft">
      <label className="sr-only" htmlFor="store-search">
        Search by city, postal code, or store
      </label>
      <div className="flex gap-2">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-rosewood" />
          <input
            id="store-search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="City or postal code"
            className="h-12 w-full rounded-full border border-champagne bg-pearl pl-10 pr-4 text-base outline-none transition focus:border-rosewood focus:bg-white"
          />
        </div>
        <Button type="button" variant="secondary" onClick={onNearMe} aria-label="Simulate stores near me" className="px-3">
          <LocateFixed className="h-5 w-5" />
          <span className="hidden sm:inline">Near me</span>
        </Button>
      </div>
    </div>
  );
}
