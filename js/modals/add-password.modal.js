import PasswordService from '../services/password.service.js';
import { urlValidatior, emailValidator } from '../utils/validator.js';
import { generateCards } from '../pages/dashboard.js';
import { showNotification } from '../utils/dom.js';
const addPasswordModal = document.getElementById('add-password-modal');
const addPasswordBtn = document.getElementById('add-password-btn');
const cancelAddPasswordBtn = document.getElementById('cancel-add-password-btn');
const closeAddModalBtn = document.getElementById('close-add-modal');
const savePasswordBtn = document.getElementById('submit-password');
const addPasswordForm = document.getElementById('add-password-form');

addPasswordBtn.addEventListener('click', () => {
    addPasswordModal.showModal();
});

function resetPasswordForm() {
    addPasswordForm.reset();
    const eyeIcon = addPasswordForm.querySelector('.show-password .eye');
    eyeIcon.classList.add('active');
    addPasswordForm.querySelector('#password').type = 'password';
}

addPasswordModal.addEventListener('close', resetPasswordForm);

cancelAddPasswordBtn.addEventListener('click', () => {
    addPasswordModal.close();
});

closeAddModalBtn.addEventListener('click', () => {
    addPasswordModal.close();
});

// Handle show/hide password toggle
const showPasswordBtn = document.getElementById('add-password-modal').querySelector('.show-password');
const passwordInput = document.getElementById('password');
const eyeIcon = showPasswordBtn.querySelector('.eye');

showPasswordBtn.addEventListener('click', () => {
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    eyeIcon.classList.toggle('active', passwordInput.type === 'password');
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

    if(!addPasswordForm.reportValidity()) {
        // this is cool because it usses the custom already designed error notifications
        // and also scrolls to the first invalid input
        return;
    }
    
    // Parse Data From Form Delegate To Service To Save Data 
    
    const formData = new FormData(addPasswordForm);
    const passwordData = parseFromData(formData);
    
    if(passwordData.url.trim() !== '' && !urlValidatior(passwordData.url)) {
        alert('Please Enter A Valid URL');
        return;
    }
    
    if(passwordData['username-email'].trim().includes('@') && !emailValidator(passwordData['username-email'])) {
        alert('Please Enter A Valid Email');
        return;
    }
    
    PasswordService.savePassword(passwordData);
    generateCards(passwordData.title, passwordData['username-email'], passwordData.password, passwordData.url, passwordData.category);

    addPasswordModal.close();
    showNotification('Password added successfully!');
});

