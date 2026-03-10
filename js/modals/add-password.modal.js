const addPasswordModal = document.getElementById('add-password-modal');
const addPasswordBtn = document.getElementById('add-password-btn');
const cancelAddPasswordBtn = document.getElementById('cancel-add-password-btn');
const closeAddModalBtn = document.getElementById('close-add-modal');
const savePasswordBtn = document.getElementById('submit-password');
const addPasswordForm = document.getElementById('add-password-form');

addPasswordBtn.addEventListener('click', () => {
    addPasswordModal.showModal();
});

cancelAddPasswordBtn.addEventListener('click', () => {
    addPasswordModal.close();
});

closeAddModalBtn.addEventListener('click', () => {
    addPasswordModal.close();
});

savePasswordBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Logic to save password

    addPasswordModal.close();
    addPasswordForm.reset();
    document.querySelector('.password-added-successfully').style.display = 'flex';
    setTimeout(() => {
        document.querySelector('.password-added-successfully').style.display = 'none';
    }, 3000);
});

