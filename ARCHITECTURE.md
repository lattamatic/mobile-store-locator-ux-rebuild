# Architecture Notes

## Product Shape

This project is intentionally small and presentation-ready. The goal is to show how a Product Owner can connect a measurable mobile UX problem to a practical prototype and clear delivery artifacts.

## State Model

`StoreLocator` owns the main UI state:

- Search query
- Selected service
- Open-now filter
- Distance range
- Selected store
- Loading and error simulations

This keeps the MVP easy to read and avoids premature state-management complexity.

## Data Model

Stores are loaded from `src/data/stores.json`. Each store includes display data, services, distance, open status, and mocked map coordinates.

## Map Strategy

The map uses OpenStreetMap tiles and browser-loaded Leaflet. This gives the prototype real pan and zoom behavior without requiring a Mapbox API key. Store data remains dummy JSON, but each store has realistic Paris latitude and longitude coordinates.

## Production Path

A production version would introduce:

- Optional Mapbox provider component
- Geolocation permission flow
- Server-driven location search
- Analytics events
- URL query state
- Automated visual regression tests
