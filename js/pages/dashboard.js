const passwords = [];


// document.querySelectorAll('.star').forEach(star => {
//     star.addEventListener('click', () => {
//         star.classList.toggle('active');
//     });
// });

// const eye = document.querySelector('.eye');
// const passwordInput = document.querySelector('.blackbox p');

// eye.addEventListener('click', () => {
//     eye.classList.toggle('active');
// });

// Generate Cards From Passwords And Other Data
function generateCards(title, user, password, url, category) {
    const cardContainer = document.getElementById('cards');
    const card = document.createElement('div');

    card.innerHTML = `
    <div class="card">
                <div class="top-part">
                    <div class="top-left-part">
                        <div class="description">
                            <h3>${title}</h3>
                            <button class="open-link">
                                <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                    d="M14 3h7v7m0-7L10 14"/>
                                <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                    d="M5 10v11h11"/>
                                </svg>
                            </button>
                        </div>
                        <p>Type Of Account</p>
                        <span>${category}</span>
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
                        <button class="btn-copy-username">
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
                            <svg class="icon eye" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                
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

                        
                        <button class="btn-copy-username">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke-width="2"/>
                                <path stroke-width="2" d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <p>Last modified: 3/14/2026</p>
             </div>
    `;

    cardContainer.appendChild(card);
}

export { generateCards };