# Mobile Store Locator UX Rebuild

A portfolio-quality Product Owner case study and working Next.js prototype for a premium beauty/salon retail brand.

## Problem Statement

The existing mobile store locator creates friction for high-intent users. The store list appears before the map, the map is difficult to access, filtering is weak, and users must scroll too much before they can choose a nearby location. With mobile representing approximately 90% of traffic, the experience needs to prioritize fast discovery and quick decision making.

## Business Context

Store locator users are usually close to conversion: booking, calling, getting directions, or validating store availability. Improving this flow can increase store visits, appointment starts, and service discovery while reducing abandonment caused by poor mobile usability.

## KPIs

- Median time to identify a relevant store
- Directions, call, and booking CTA click-through rate
- Store detail open rate
- Filter engagement rate
- Map interaction rate
- Mobile scroll depth before first useful result
- Empty-result recovery rate

## Screenshots

Place final screenshots in `public/screenshots/`.

- Mobile map-first experience: `public/screenshots/mobile-locator.png`
- Desktop split layout: `public/screenshots/desktop-locator.png`
- Store detail drawer: `public/screenshots/store-detail.png`

## Features

- Real OpenStreetMap/Leaflet map with selectable store pins
- Store cards sorted by distance
- Search by city, postal code, or store name
- Service, open now, and distance filters
- Sticky mobile filters
- Map-first mobile layout
- Responsive desktop split layout
- “Near me” simulation
- Store detail drawer
- SEO-friendly sample salon page
- Loading, empty, and error states

## Architecture Overview

```text
src/app             Next.js app router entry points
src/components      Reusable UI and locator components
src/data            Mock JSON store data
src/lib             Filtering and sorting logic
src/types           Shared TypeScript domain types
```

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Mock JSON data
- OpenStreetMap tiles with browser-loaded Leaflet
- Google Places API build-time enrichment for salon pages
- Lucide React icons

## Google Places API Setup

Salon pages can fetch Google Places data at build time. This keeps the API key out of the browser and works with GitHub Pages static export.

Local `.env.local`:

```bash
GOOGLE_PLACES_API_KEY=your_google_places_api_key
DAVID_MALLETT_PLACE_ID=optional_google_place_id
```

Copy the example file before local testing:

```bash
cp .env.local.example .env.local
```

Then paste your real values into `.env.local`. Do not commit `.env.local`.

GitHub Pages deployment:

- Add `GOOGLE_PLACES_API_KEY` as a repository secret.
- Add `DAVID_MALLETT_PLACE_ID` as an optional repository secret.
- If no Place ID is provided, the build uses Places Text Search with the salon name and full address, then fetches Place Details.
- If the API key is missing or the request fails, the page falls back to source-backed static content.

## Future Improvements

- Mapbox integration if the brand needs commercial styling, analytics, or SLA-backed tiles
- Browser geolocation with consent handling
- Appointment availability by service
- Analytics events for funnel measurement
- A/B test for map height and filter placement
- Accessibility testing with screen reader flows
