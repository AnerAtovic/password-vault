document.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const pw = document.getElementById("pw").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find(user => user.email === email && user.pw === pw);

    if (!userExists) {
        document.getElementById("signinmsg").innerText = "Wrong credentials.";
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(userExists));

    document.getElementById("signinmsg").innerText = "Logged in successfully!";
});