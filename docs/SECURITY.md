# Security Model (Zero-Knowledge)

This project aims for a **zero-knowledge password vault**:
- Server stores only encrypted vault data.
- Client derives keys from master password.
- Client decrypts vault locally after login.

## What the server must NEVER get
- Master password (plaintext)
- Vault encryption key `K_enc`
- Decrypted vault contents

## Key derivation
- Use **PBKDF2** with a random per-user **salt**
- Parameters:
  - hash: SHA-256 (typical for WebCrypto PBKDF2)
  - iterations: choose a high value and tune for UX/security
  - key length: enough bytes to derive encryption + auth keys

### Salt vs IV
- **Salt:** per user, stored on server (not secret)
- **IV/nonce:** per encryption operation (AES-GCM), stored with ciphertext (not secret), must be unique

## Vault encryption
- Use **AES-GCM** to encrypt the entire vault JSON (single blob per user)
- Store:
  - `ciphertextB64`
  - `ivB64`
  - `version`

## Authentication (verifier/proof)
Server must verify login without receiving `K_enc`.

A safe approach uses:
- `K_auth` derived from the master password (separate from `K_enc`)
- A **challenge-response** proof to prevent replay:
  - server sends `challenge` (nonce)
  - client sends `proof = HMAC(K_auth, challenge)`
  - server validates proof

> Full PAKE protocols (OPAQUE/SRP) are best-in-class, but challenge-response HMAC is a reasonable intermediate design.

## Option 1 login (returns encrypted vault)
Login endpoint returns the encrypted vault if auth succeeds:
- server: verifies proof
- server: returns `{ ciphertextB64, ivB64, version, saltB64, kdfParams }`
- client: derives `K_enc`, decrypts, renders dashboard

## Single encrypted vault blob consequences
- Client must re-encrypt entire vault on every update (add/edit/delete)
- Client-side filtering/search after decrypt is standard
- Server can’t search without extra design

## “Never do” checklist
- Never store `K_enc` in localStorage
- Never send `K_enc` to the server
- Always generate a fresh random IV for each AES-GCM encryption
- Always use HTTPS in production
- Don’t log secrets (passwords, derived keys, plaintext vault)

## Future hardening ideas
- Key rotation
- PAKE (OPAQUE/SRP)
- Secure clipboard handling + auto-clear
- Lock vault after inactivity