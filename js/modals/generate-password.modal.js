const modal = document.getElementById('generate-password-modal');
const generateBtn = document.getElementById('generate-password-btn');
const passwordLengthInput = document.getElementById('password-length');
const generatedPasswordDisplay = document.getElementById('generated-password');

const close = document.getElementById('close-generate-modal');
const done = document.getElementById('generate-modal-done');
const newPassword = document.getElementById('regenerate');
let passwordLength = parseInt(passwordLengthInput.value);
let password = "";

let includeUppercase = document.getElementById('uppercase').checked;
let includeLowercase = document.getElementById('lowercase').checked;
let includeNumbers = document.getElementById('numbers').checked;
let includeSymbols = document.getElementById('symbols').checked;

document.getElementById('uppercase').addEventListener('change', (e) => {
    includeUppercase = e.target.checked;
    regenerate();
});

document.getElementById('lowercase').addEventListener('change', (e) => {
    includeLowercase = e.target.checked;
    regenerate();
});

document.getElementById('numbers').addEventListener('change', (e) => {
    includeNumbers = e.target.checked;
    regenerate();
});

document.getElementById('symbols').addEventListener('change', (e) => {
    includeSymbols = e.target.checked;
    regenerate();
});

generateBtn.addEventListener('click', () => {
    modal.showModal();
    regenerate();
});

close.addEventListener('click', () => {
    modal.close();
});

done.addEventListener('click', () => {
    modal.close();
});

passwordLengthInput.oninput = (e) => {
    document.getElementById('length-value').textContent = e.target.value;
    passwordLength = parseInt(e.target.value);
    regenerate();
};

function regenerate() {
    generatedPasswordDisplay.value = generatePassword(passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    password = generatedPasswordDisplay.value;
    passwordStrength();
}

newPassword.addEventListener('click', () => {
    regenerate();
});

document.getElementById('copy-generated').addEventListener('click', () => {
    navigator.clipboard.writeText(generatedPasswordDisplay.value);
    document.getElementById('copy-msg').style.display = 'block';
    setTimeout(() => {
        document.getElementById('copy-msg').style.display = 'none';
    }, 2000);
});

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

function passwordStrength(){
    const displayStrength = document.getElementById('strength');
    let strength = 0;
    if(password.length >= 12) strength++;
    if(password.length >= 16) strength++;
    
    if (includeUppercase && includeLowercase) strength++;
    if (includeNumbers) strength++;
    if (includeSymbols) strength++;

    if(strength <= 2){
        displayStrength.textContent = 'Weak';
        displayStrength.style.backgroundColor = '#ef4444';
        return;
    }

    if(strength <= 3){
        displayStrength.textContent = 'Medium';
        displayStrength.style.backgroundColor = '#eab308';
        return;
    }

    displayStrength.textContent = 'Strong';
    displayStrength.style.backgroundColor = '#22c55e';
}