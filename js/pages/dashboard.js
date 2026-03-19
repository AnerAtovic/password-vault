import { copyContentToClipboard, showNotification} from '../utils/dom.js';
import PasswordService from '../services/password.service.js';
const passwords = [];
const logoutBtn = document.getElementById('logout-btn');
const searchInput = document.getElementById('search-input');
const noPasswords = document.getElementById('no-password');
const cardContainer = document.getElementById('cards');
const contentDiv = document.querySelector('.content');


// cool little thing
searchInput.addEventListener('input', (e) => {
    searchFilter(e.target.value);
});


function loadCards(){
    // test function for loading a default set of cards without storage
    const arr = [
        {
            title: 'Gmail',
            username: 'random1',
            password: "rng",
            url: '',
            category: 'Email'
        },
        {
            title: 'GitHub',
            username: 'random2',
            password: "rng",
            url: 'https://github.com',
            category: 'Development'
        },
        {
            title: 'Facebook',
            username: 'random3',
            password: "rng",
            url: 'https://facebook.com',
            category: 'Entertainment'
        },
        {
            title: 'Twitter',
            username: 'random4',
            password: "rng",
            url: 'https://twitter.com',
            category: 'Entertainment'
        }
    ];
    arr.forEach(item => generateCards(item.title, item.username, item.password, item.url, item.category));
    const cardsFromStorage = PasswordService.getAllPasswords();
    if(cardsFromStorage.length === 0){
        console.log('No passwords found in storage. Showing empty state.');
    }
    updateEmptyState();
}


// Load all cards on page load
window.addEventListener('DOMContentLoaded', () => {
    loadCardsFromStorage();
    loadCards();
});

logoutBtn.addEventListener('click', () => {
    // Currently only redirects for mvp later when express is written implement the body and logic
    window.location.href = '../index.html';
});



// Generate Cards From Passwords And Other Data
function generateCards(title, user, password, url, category) {
    const card = document.createElement('div');
    card.classList.add('card');
    // time of creation of the card or modification is when the card itself is created or modified and not when the password is created or modified because the password can be created a long time ago but the card is created now when the user adds it to the vault
    const time = new Date().toLocaleDateString().split(",")[0]; 
    if(url.trim() !== ''){
    url =  `
        <a href="${url}" target="_blank" class="open-link">
            <button class="open-link">
                <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    d="M14 3h7v7m0-7L10 14"/>
                <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    d="M5 10v11h11"/>
                </svg>
            </button>
        </a>`;
    }

    card.innerHTML = `
                <div class="top-part">
                    <div class="top-left-part">
                        <div class="description">
                            <h3>${title}</h3>
                            ${url}
                        </div>
                        <p>${user}</p>
                        <span id="categoryId">${category}</span>
                    </div>
                    <div class="rhs-btn">
                         <!-- Star Icon -->
                        <button class="btn-favourite">
                            <svg class="icon star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path class="star-path"
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.26a1 1 0 00.95.69h6.588c.969 0 1.371 1.24.588 1.81l-5.33 3.872a1 1 0 00-.364 1.118l2.036 6.26c.3.921-.755 1.688-1.54 1.118l-5.33-3.872a1 1 0 00-1.175 0l-5.33 3.872c-.784.57-1.838-.197-1.539-1.118l2.036-6.26a1 1 0 00-.364-1.118L.887 11.687c-.783-.57-.38-1.81.588-1.81h6.588a1 1 0 00.95-.69l2.036-6.26z"/>
                            </svg>
                        </button>

                        <!-- Trash Icon -->
                        <button class="btn-delete">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-1 14H6L5 7m5 4v6m4-6v6M9 7V4h6v3"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="center-part">
                    <div class="top-center-part">
                        <label for="Username">Username</label>
                        <input type="text" id="Username" class="blackbox-sm" value="${user}" readonly>
                        <button class="btn-copy">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke-width="2"/>
                                <path stroke-width="2" d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                            </svg>
                        </button>
                    </div>
                    <div class="bottom-center-part">
                        <label for="Password">Password</label>
                        <input type="password" id="Password" class="blackbox-sm" value="${password}" readonly>

                        <!-- Eye Icon To Show -->
                        <button class="icon-btn">
                            <svg class="icon eye active" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                
                                <!-- Normal Eye -->
                                <path class="eye-open"
                                d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                                stroke="currentColor" stroke-width="2" fill="none"/>
                                <circle class="eye-open"
                                cx="12" cy="12" r="3"
                                stroke="currentColor" stroke-width="2" fill="none"/>

                                <!-- Cross Line -->
                                <line class="eye-closed"
                                x1="3" y1="3" x2="21" y2="21"
                                stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </button> 

                        
                        <button class="btn-copy">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke-width="2"/>
                                <path stroke-width="2" d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <p id="last-modified">Last modified: ${time}</p>
    `;
    
    addEventListenersToCard(card); // each card will get its own event listener because it binds to this instance (each thing in js is a reference)
    cardContainer.prepend(card); // this adds the card to the beggining not the end
    updateEmptyState();
}

function addEventListenersToCard(cardElement) {
    // each card element will bea loaded as a json object from storage and then event listeners will be added to it like the show password and copy buttons and the delete button
    const starToggle  = cardElement.querySelector(".btn-favourite");
    const trashBtn = cardElement.querySelector(".btn-delete");
    const copyBtns = cardElement.querySelectorAll(".btn-copy");
    const eyeBtn = cardElement.querySelector(".icon-btn");
    const passwordInput = cardElement.querySelector('#Password');

    // mora na citav button ne na sam svg
    starToggle.addEventListener('click', () => {
        const starIcon = cardElement.querySelector('.star');
        starIcon.classList.toggle('active');
    });

    trashBtn.addEventListener('click', () => {
        if(confirm("are yo sure you want to remove this password? This action cannot be undone.")) {
            cardElement.remove();
            // remove from storage
            showNotification('Password deleted');
            updateEmptyState();
        }
    });

    copyBtns[0].addEventListener('click', () => {
        const username = cardElement.querySelector('#Username').value;
        copyContentToClipboard(username);
        showNotification('Username copied to clipboard!');
    });

    copyBtns[1].addEventListener('click', () => {
        const password = cardElement.querySelector('#Password').value;
        copyContentToClipboard(password);
        showNotification('Password copied to clipboard!');
    });

    eyeBtn.addEventListener('click', () => {
        const eyeIcon = eyeBtn.querySelector('.eye');
        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
        eyeIcon.classList.toggle('active', passwordInput.type === 'password');
    });
}

function loadCardsFromStorage() {
    // Get Cards Data From Storage And Loop Over It To Generate Cards
    const storedCards = PasswordService.getAllPasswords();
    storedCards.forEach(cardData => {
        generateCards(cardData.title, cardData['username-email'], cardData.password, cardData.url, cardData.category);
    });
}


// Filtering Logic
const filterBtns = document.querySelector(".filter-btns").children;

for(const btn of filterBtns) {
    btn.addEventListener('click', () => {
        // toggle active class
        for(const button of filterBtns) {
            button.classList.remove('btn-active');
        }
        btn.classList.add('btn-active');
        showCards(btn.value);
    });
}

function showCards(category) {
    const allCards = document.querySelectorAll('.card');

    if(category === 'All') {
        allCards.forEach(card => card.style.display = '');
        updateEmptyState();
        return;
    }

    allCards.forEach(card => {
        const cardCategory = card.querySelector('#categoryId').textContent;
        if(cardCategory === category){
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });

    updateEmptyState();
}

function searchFilter(serachText){
    const allCards = document.querySelectorAll('.card');

    allCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        if(title.includes(serachText.toLowerCase())){
            card.style.display = '';
        } else{ 
            card.style.display = 'none';
        }
    });

    updateEmptyState();
}

function updateEmptyState() {
    const cards = cardContainer.querySelectorAll('.card');
    const hasVisibleCard = Array.from(cards).some((card) => card.style.display !== 'none');
    const shouldShowEmptyState = cards.length === 0 || !hasVisibleCard;

    noPasswords.classList.toggle('is-visible', shouldShowEmptyState);
    contentDiv.classList.toggle('is-empty', shouldShowEmptyState);
}






export { generateCards };