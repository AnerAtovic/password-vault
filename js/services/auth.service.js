


function registerUser(name, email, password, repeatPassword) {
    if (password !== repeatPassword) {
        throw new Error("Passwords do not match");
    }

    const userKeys = deriveKeys(password);
}

function loginUser(email, password) {
    const userKeys = deriveKeys(password);
    
    if(!userKeys.authKey != storedAuthKey) {
        throw new Error("Invalid credentials");
    }

    return decryptVault(storedEncryptedVault, userKeys.encryptionKey);
}


function saveUserAuthRecord(username, authToken) {
    // Placeholder: Implement actual storage logic (e.g., localStorage, IndexedDB, or server-side)
    const userData = { authToken };
    localStorage.setItem(`user_${username}`, JSON.stringify(userData));
}

function verifyAuthToken(authToken, storedAuthToken) {
    return authToken === storedAuthToken;
}


// placeholder helper functions for now
function getUserAuthTokenRecord(username) {
    const userData = JSON.parse(localStorage.getItem(`user_${username}`));
    return userData ? userData.authToken : null;
}

const authService = {
    saveUserAuthRecord,
    verifyAuthToken,
    getUserAuthTokenRecord,
};

export default authService;