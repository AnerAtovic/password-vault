# ADR 0003: UI Updates From Modals (Callbacks or Events)

## Context
Modals need to notify dashboard to rerender after a vault change.
Directly importing dashboard functions from modals risks circular imports.

## Decision
Prefer callback injection:
- dashboard initializes modal with `onSaved()` callback
Alternative:
- custom DOM events (e.g., `vault:changed`)

## Consequences
- No modal → dashboard imports needed.
- Clear ownership: dashboard owns rendering; modal owns form UX + calls services.