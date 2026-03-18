function copyContentToClipboard(content) {
    navigator.clipboard.writeText(content)
    .then(() => {
        console.log("copied to clipboard successfully!");
    })
    .catch(err => {
        console.error('Failed to copy: ', err);
    });
};


const notificationMsg = document.getElementById('notification');
let notificationTimeoutId;
let notificationHideAnimationTimeoutId;

function getNotificationHost() {
    return document.querySelector('dialog[open]') || document.body;
}

function showNotification(message) {
    if (!notificationMsg) {
        return;
    }

    const notificationHost = getNotificationHost();
    if (notificationMsg.parentElement !== notificationHost) {
        notificationHost.appendChild(notificationMsg);
    }

    notificationMsg.querySelector('p').textContent = message;
    notificationMsg.style.display = 'flex';
    notificationMsg.classList.remove('is-visible');
    void notificationMsg.offsetWidth;
    notificationMsg.classList.add('is-visible');

    if (notificationTimeoutId) {
        clearTimeout(notificationTimeoutId);
    }

    if (notificationHideAnimationTimeoutId) {
        clearTimeout(notificationHideAnimationTimeoutId);
    }

    notificationTimeoutId = setTimeout(() => {
        notificationMsg.classList.remove('is-visible');
        notificationHideAnimationTimeoutId = setTimeout(() => {
            notificationMsg.style.display = 'none';
        }, 180);
    }, 3000);
}


export { copyContentToClipboard, showNotification };