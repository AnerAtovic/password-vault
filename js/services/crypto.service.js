import authService from './auth.service.js'; // placeholders for now
import storageService from './storage.service.js';

const ITERATIONS = 600000;
const SALT_LENGTH = 16;
const IV_LENGTH = 12;

const encoder = new TextEncoder(); // these aren't unique they always have the same mapping
const decoder = new TextDecoder();

function generateSalt() {
    return window.crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
}

function generateIv() {
    return window.crypto.getRandomValues(new Uint8Array(IV_LENGTH));
}

// Expands the password into 64 bytes and split into 2 32B parts
async function expandKey(password, salt) {
    const passBytes = encoder.encode(password);

    // we need to extend the password to make the entropy higher and to split it into 
    // two equal parts
    const baseKey = await window.crypto.subtle.importKey(
        'raw',
        passBytes,
        { name: 'PBKDF2' },
        false,
        ['deriveBits']
    );

    //these are the new bits / password
    const derivedBits = await window.crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            hash: 'SHA-512',
            salt,
            iterations: ITERATIONS,
        },
        baseKey,
        512
    );

    const derivedBytes = new Uint8Array(derivedBits);
    return {
        kEnc: derivedBytes.slice(0, 32),
        authToken: derivedBytes.slice(32, 64),
    };
}


async function generateKey(kEnc, type) {
    // we need the actual key for encryption / decryption
    return window.crypto.subtle.importKey(
        'raw',
        kEnc,
        { name: 'AES-GCM' },
        false,
        [type]
    );
}

async function encryptVault(vaultData, encryptionKey, iv) {
    const vaultBytes = encoder.encode(JSON.stringify(vaultData)); // core idea for now to store data as JSON

    const encryptedData = await window.crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv,
        },
        encryptionKey,
        vaultBytes
    );

    return { encryptedData, iv };
}

async function decryptVault(encryptedData, decryptionKey, iv) {
    const decryptedBuffer = await window.crypto.subtle.decrypt(
        {
            name: 'AES-GCM',
            iv: iv
        },
        decryptionKey,
        encryptedData
    );

    return JSON.parse(decoder.decode(decryptedBuffer));
}

function packEncryptedPayload(salt, iv, encryptedData) {
    const encryptedBytes = new Uint8Array(encryptedData);
    const payload = new Uint8Array(SALT_LENGTH + IV_LENGTH + encryptedBytes.length);

    payload.set(salt, 0);
    payload.set(iv, SALT_LENGTH);
    payload.set(encryptedBytes, SALT_LENGTH + IV_LENGTH);

    return payload;
}

function unpackEncryptedPayload(payload) {
    const payloadBytes = payload instanceof Uint8Array ? payload : new Uint8Array(payload);

    const salt = payloadBytes.slice(0, SALT_LENGTH);
    const iv = payloadBytes.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
    const encryptedBytes = payloadBytes.slice(SALT_LENGTH + IV_LENGTH);

    return {
        salt,
        iv,
        encryptedData: encryptedBytes.buffer,
    };
}

async function securePassword(password, salt) {
    const keyParts = await expandKey(password, salt);
    return keyParts.authToken;
}

async function cryptoRegistration({ username, password }) {
    const salt = generateSalt();
    const iv = generateIv();

    const keyParts = await expandKey(password, salt);
    const encryptionKey = await generateKey(keyParts.kEnc, 'encrypt');
    const initialVault = []; // empty vault which will be filled with JSON objects
    const { encryptedData } = await encryptVault(initialVault, encryptionKey, iv);
    const payload = packEncryptedPayload(salt, iv, encryptedData);
    const payloadB64 = bufferToB64(payload);

    // also placeholder stuff for now
    authService.saveUserAuthRecord(username, keyParts.authToken);
    storageService.saveUserVaultPayload(username, payloadB64);

    return { username, payloadB64 };
}

async function cryptoLogin({ username, password }) {
    const storedAuthToken = await authService.getUserAuthTokenRecord(username);
    const payloadB64 = storageService.getUserVaultPayload(username);
    const payload = b64ToBuffer(payloadB64);
    const { salt, iv, encryptedData } = unpackEncryptedPayload(payload);

    const keyParts = await expandKey(password, salt);
    const isValid = authService.verifyAuthToken(keyParts.authToken, storedAuthToken);

    if (!isValid)
        throw new Error('Wrong username or password');

    const decryptionKey = await generateKey(keyParts.kEnc, 'decrypt');
    const userData = await decryptVault(encryptedData, decryptionKey, iv);

    return userData;
}

// now for all of this to work and be able to sent to a db it needs to be converted to a string
// since we can't send typedarrays
function b64ToBuffer(b64) {
    const binaryString = atob(b64);
    const buffer = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        buffer[i] = binaryString.charCodeAt(i);
    }
    return buffer;
}

function bufferToB64(buffer) {
    let binaryString = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binaryString += String.fromCharCode(bytes[i]);
    }
    return btoa(binaryString);
}


const cryptoService = {
    generateSalt,
    generateIv,
    expandKey,
    generateKey,
    encryptVault,
    decryptVault,
    packEncryptedPayload,
    unpackEncryptedPayload,
    securePassword,
    cryptoRegistration,
    cryptoLogin,
    b64ToBuffer,
    bufferToB64
};

export default cryptoService;
