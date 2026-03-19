# ADR 0002: Single Encrypted Vault Blob Per User

## Context
We can store vault as either:
- one encrypted blob containing all entries, or
- many encrypted entries separately.

## Decision
Use a single encrypted blob per user (vault JSON encrypted with AES-GCM).

## Consequences
- Simplifies server storage.
- Each add/edit/delete requires re-encrypting and re-uploading the whole vault.
- Fine for MVP and small vault sizes.