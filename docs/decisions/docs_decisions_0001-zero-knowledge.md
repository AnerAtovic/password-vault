# ADR 0001: Zero-Knowledge Vault

## Context
We want the server to store user vaults without being able to decrypt them.

## Decision
Vault encryption/decryption happens client-side only.
Server stores only ciphertext + non-secret metadata (salt, IV, version) and authentication verifier/proof material.

## Consequences
- Server cannot search/filter vault contents.
- Client must decrypt locally to render dashboard.
- Key management must avoid storing encryption keys persistently in the browser.