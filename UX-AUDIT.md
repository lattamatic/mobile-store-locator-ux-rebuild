# UX Audit

## Existing UX Issues

- Store list appears above the map, delaying spatial orientation.
- Mobile users must scroll before reaching the most useful visual element.
- The map occupies too much vertical space once reached.
- Filters are weak and do not support quick service-led discovery.
- Store cards do not prioritize decision criteria clearly.
- The experience feels linear instead of letting users compare map and list together.

## Mobile Pain Points

- Excessive scrolling before the first meaningful interaction
- Low map discoverability
- Slow comparison between nearby stores
- Filters that require too much effort for a small screen
- Lack of progressive disclosure for store detail

## Accessibility Concerns

- Map pins need accessible labels.
- Filter controls need clear names and states.
- Drawer must use dialog semantics and close controls.
- CTAs should have sufficient tap targets.
- Color should not be the only indicator of open or selected states.

## Proposed Improvements

- Move search, filters, and map to the top of the mobile page.
- Keep filters sticky and horizontally scannable.
- Limit mobile map height to preserve result visibility.
- Sort cards by distance by default.
- Use short store cards focused on open status, distance, services, and CTAs.
- Use a detail drawer for secondary information.
- Provide clear empty, loading, and error states.

## UX Rationale

The redesign treats store discovery as a high-intent mobile task. Users should orient, refine, compare, and act without losing context. The map-first layout improves spatial awareness, while the compact list supports fast comparison. Progressive disclosure keeps the main screen focused and reserves detailed information for users who actively request it.
