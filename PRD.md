# PRD: Mobile Store Locator UX Rebuild

## Goals

- Reduce mobile scrolling friction in the store discovery journey.
- Make the map immediately accessible on mobile.
- Help users find a relevant nearby store faster.
- Improve conversion intent through clearer CTAs.
- Demonstrate a pragmatic MVP that can evolve into a production locator.

## Non-goals

- Backend store management
- Real geocoding
- Real booking integration
- Payments or account login
- Full Mapbox production setup

## User Personas

### Mobile beauty shopper

A user searching quickly from a phone before visiting or booking. They need nearby options, opening status, and services without excessive scrolling.

### Service-led salon customer

A user looking for a specific service such as color, blowout, skincare, or brow bar. They need lightweight filtering and enough confidence to choose a location.

### Retail operations stakeholder

A business user who cares about locator performance, store visibility, and conversion signals such as directions, calls, and booking starts.

## User Stories

- As a mobile user, I want to see the map immediately so I can understand nearby options.
- As a user, I want to search by city or postal code so I can quickly narrow locations.
- As a user, I want to filter by available services so I can find a relevant store.
- As a user, I want to see whether stores are open now so I avoid wasted trips.
- As a user, I want store details in a drawer so I do not lose my place.

## Acceptance Criteria

- The mobile layout shows search, filters, and map before the store list.
- Store results are sorted by distance.
- Filters update the result list and map pins.
- Empty, loading, and error states are visible and understandable.
- The desktop layout supports side-by-side browsing.
- Store detail opens in a modal or drawer without route navigation.
- All data comes from mock JSON.

## KPIs

- Time to first relevant store selection
- Store detail open rate
- Directions CTA click-through rate
- Booking CTA click-through rate
- Filter usage rate
- Map pin interaction rate
- Result recovery after empty state

## Assumptions

- Mobile users represent around 90% of store locator sessions.
- Most users arrive with high local intent.
- Distance and open status are stronger decision factors than long store descriptions.
- OpenStreetMap tiles are acceptable for MVP validation; a branded Mapbox layer can be added later if needed.

## Risks

- Too many filters could slow decision making.
- A map that is too tall could recreate scrolling friction.
- Mock distance data may hide production geolocation complexity.
- Users may need service availability by time slot in later phases.

## Prioritization

1. Map-first mobile structure
2. Search and distance sorting
3. Lightweight filters
4. Store card comparison
5. Detail drawer
6. State handling
7. Analytics instrumentation
