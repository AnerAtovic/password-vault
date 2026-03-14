import PasswordService from '../services/password.service.js';
const addPasswordModal = document.getElementById('add-password-modal');
const addPasswordBtn = document.getElementById('add-password-btn');
const cancelAddPasswordBtn = document.getElementById('cancel-add-password-btn');
const closeAddModalBtn = document.getElementById('close-add-modal');
const savePasswordBtn = document.getElementById('submit-password');
const addPasswordForm = document.getElementById('add-password-form');
import passwordSerivce from '../services/password.service.js';
import { generateCards } from '../pages/dashboard.js';
addPasswordBtn.addEventListener('click', () => {
    addPasswordModal.showModal();
});

cancelAddPasswordBtn.addEventListener('click', () => {
    addPasswordModal.close();
});

closeAddModalBtn.addEventListener('click', () => {
    addPasswordModal.close();
});

function parseFromData(formData) {
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    return data;
}

savePasswordBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Parse Data From Form Delegate To Service To Save Data 
    // And Then Refresh The Page To Show The Added Card

    const formData = new FormData(addPasswordForm);
    const passwordData = parseFromData(formData);
    PasswordService.savePassword(passwordData);
    // Refresh Website With NewCard
    generateCards(passwordData.title, passwordData['username-email'], passwordData.password, passwordData.url, passwordData.category);

    addPasswordModal.close();
    addPasswordForm.reset();

    document.querySelector('.password-added-successfully').style.display = 'flex';
    setTimeout(() => {
        document.querySelector('.password-added-successfully').style.display = 'none';
    }, 3000);
});

