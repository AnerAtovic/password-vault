import { generatePassword, getPasswordStrength } from '../utils/generator.js';

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


function passwordStrength(){
    const displayStrength = document.getElementById('strength');
    const strength = getPasswordStrength(password, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    displayStrength.textContent = strength.strength;
    displayStrength.style.backgroundColor = strength.score === 1 ? '#ff4d4d' : strength.score === 2 ? '#ffcc00' : '#4CAF50';
}

