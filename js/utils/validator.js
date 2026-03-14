// For Validation Of Inputs

function urlValidatior(url){
    // Regex
    const urlPattern = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
}

function emailValidator(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}