function login() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let storedUser = localStorage.getItem("user");

    let user = JSON.parse(storedUser);

    if (email === user.email && password === user.password) {

        document.getElementById("message").innerText =
            "Login Successful!";

        window.location.href = "dashboard.html";

    } else {

        document.getElementById("message").innerText =
            "Invalid Email or Password";
    }
}