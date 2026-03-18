function copyContentToClipboard(content) {
    navigator.clipboard.writeText(content)
    .then(() => {
        alert('Copied to clipboard!');
    })
    .catch(err => {
        console.error('Failed to copy: ', err);
    });
};


const notificationMsg = document.getElementById('notification');

function showNotification(message) {
    notificationMsg.querySelector('p').textContent = message;
    notificationMsg.style.display = 'flex';
    setTimeout(() => {
        notificationMsg.style.display = 'none';
    }, 3000);
}


export { copyContentToClipboard, showNotification };