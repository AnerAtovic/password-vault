# API Contract (Express) — Zero-Knowledge, Option 1

This document describes the intended API for the future Express backend.
The server stores only ciphertext and verification data; it cannot decrypt the vault.

## Data formats

### Base64 encoding
Binary fields are transmitted/stored as base64 strings:
- `saltB64`
- `ivB64`
- `ciphertextB64`
- `challengeB64` (if used)

### KDF params
Example:
```json
{
  "kdf": "PBKDF2",
  "hash": "SHA-256",
  "iterations": 310000
}
```

---

## 1) Register

### `POST /api/register`
Creates a user record and stores the initial encrypted vault.

Request:
```json
{
  "email": "user@example.com",
  "saltB64": "<base64>",
  "kdfParams": { "kdf": "PBKDF2", "hash": "SHA-256", "iterations": 310000 },
  "authVerifier": "<string>",
  "vault": {
    "version": 1,
    "ivB64": "<base64>",
    "ciphertextB64": "<base64>"
  }
}
```

Response (success):
```json
{ "ok": true }
```

Errors:
- 409 if user exists
- 400 if invalid payload

---

## 2) Login (Option 1)

### `POST /api/login`
Option 1: On success returns encrypted vault immediately.

Recommended challenge-response variant:

#### `POST /api/login/challenge`
Request:
```json
{ "email": "user@example.com" }
```

Response:
```json
{
  "saltB64": "<base64>",
  "kdfParams": { "kdf": "PBKDF2", "hash": "SHA-256", "iterations": 310000 },
  "challengeB64": "<base64>"
}
```

#### `POST /api/login`
Request:
```json
{
  "email": "user@example.com",
  "proof": "<string>"
}
```

Response (success):
```json
{
  "vault": {
    "version": 1,
    "ivB64": "<base64>",
    "ciphertextB64": "<base64>"
  }
}
```

Errors:
- 401 invalid proof
- 404 unknown user

---

## 3) Save vault (overwrite blob)

### `PUT /api/vault`
Stores a new vault ciphertext blob (client re-encrypts entire vault).

Request:
```json
{
  "email": "user@example.com",
  "vault": {
    "version": 1,
    "ivB64": "<base64>",
    "ciphertextB64": "<base64>"
  }
}
```

Response:
```json
{ "ok": true }
```

Notes:
- Auth/session mechanism TBD (cookie or bearer token).
- Server never decrypts.

---

## Error format (recommended)
```json
{
  "ok": false,
  "error": {
    "code": "INVALID_PROOF",
    "message": "Login failed"
  }
}
```