// Generate Passwords Algorithm

// Function For Generating Passwords The Same One As In Figma
function generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let charset = '';

    if (includeUppercase) charset += uppercase;
    if (includeLowercase) charset += lowercase;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    if (!charset) return '';

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        generatedPassword += charset[randomIndex];
    }
    return generatedPassword;
}

// Password Strength
function getPasswordStrength(password, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
    const output = {
        "strength" : "Strong",
        "score" : 3
    };

    let strength = 0;
    if(password.length >= 12) strength++;
    if(password.length >= 16) strength++;
    
    if (includeUppercase && includeLowercase) strength++;
    if (includeNumbers) strength++;
    if (includeSymbols) strength++;

    if(strength <= 2){
        output.strength = 'Weak';
        output.score = 1;
        return output;
    }

    if(strength <= 3){
        output.strength = 'Medium';
        output.score = 2;
        return output;
    }

    return output;
}


export { generatePassword, getPasswordStrength };
