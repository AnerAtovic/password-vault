import { generatePassword, getPasswordStrength } from '../utils/generator.js';
import { copyContentToClipboard, showNotification } from '../utils/dom.js';

const modal = document.getElementById('generate-password-modal');
const generateBtn = document.getElementById('generate-password-btn');
const passwordLengthInput = document.getElementById('password-length');
const generatedPasswordDisplay = document.getElementById('generated-password');

const close = document.getElementById('close-generate-modal');
const done = document.getElementById('generate-modal-done');
const newPassword = document.getElementById('regenerate');
let passwordLength = parseInt(passwordLengthInput.value);
let password = "";

// easier to get an array of checkboxes this way instead of getting each one by id
const characterTypeCheckboxes = document.querySelectorAll('.check-boxes input[type="checkbox"]');

function getCharacterTypeState() {
    return {
        includeUppercase: document.getElementById('uppercase').checked,
        includeLowercase: document.getElementById('lowercase').checked,
        includeNumbers: document.getElementById('numbers').checked,
        includeSymbols: document.getElementById('symbols').checked,
    };
}

characterTypeCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        if (!checkAtLeastOneChecked()) {
            showNotification('Please select one character type');
            return;
        }

        regenerate();
    });
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
    if (!checkAtLeastOneChecked()) {
        return;
    }

    const { includeUppercase, includeLowercase, includeNumbers, includeSymbols } = getCharacterTypeState();
    generatedPasswordDisplay.value = generatePassword(passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    password = generatedPasswordDisplay.value;
    passwordStrength();
}

newPassword.addEventListener('click', () => {
    regenerate();
});

document.getElementById('copy-generated').addEventListener('click', () => {
    copyContentToClipboard(generatedPasswordDisplay.value);
    showNotification('Password copied to clipboard!');
});


function passwordStrength(){
    const displayStrength = document.getElementById('strength');
    const { includeUppercase, includeLowercase, includeNumbers, includeSymbols } = getCharacterTypeState();
    const strength = getPasswordStrength(password, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    displayStrength.textContent = strength.strength;
    displayStrength.style.backgroundColor = strength.score === 1 ? '#ff4d4d' : strength.score === 2 ? '#ffcc00' : '#4CAF50';
}

function checkAtLeastOneChecked() {
    return Array.from(characterTypeCheckboxes).some((checkbox) => checkbox.checked);
}