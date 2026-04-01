document.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const pw = document.getElementById("pw").value;
    const pw2 = document.getElementById("pw-confirm").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find(user => user.email === email);

    if (userExists) {
        document.getElementById("signupmsg").innerText = "User already exists!";
        return;
    }

    if (pw != pw2) {
        // TODO MAKE NOTIFICATION DON'T ONLY CHANGE TEXT
        document.getElementById("signupmsg").innerText = "Passwords don't match!";
        return;
    }

    // if password is matches time to use it as master key for encryption 
    

    users.push({ name, email, pw });

    localStorage.setItem("users", JSON.stringify(users));

    document.getElementById("signupmsg").innerText = "Registered successfully!"; // here you have text for now but change it appropriately 
});

