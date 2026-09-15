let storedUser = localStorage.getItem("user");

let user = JSON.parse(storedUser);

document.getElementById("userDetails").innerHTML = `
    <h2>Welcome ${user.name}</h2>
    <p>Name: ${user.name}</p>
    <p>Email: ${user.email}</p>
`;