document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', () => {
        star.classList.toggle('active');
    });
});

const eye = document.querySelector('.eye');
const passwordInput = document.querySelector('.blackbox p');

eye.addEventListener('click', () => {
    eye.classList.toggle('active');
});


