const messagee = document.getElementById("messagee");
const button = document.getElementById("button");

messagee.style.display = "none";
button.textContent = "Show Message";

button.addEventListener("click", function() {
    if (messagee.style.display === "none") {
        messagee.style.display = "block";
        button.textContent = "Hide Message";
    } else {
        messagee.style.display = "none";
        button.textContent = "Show Message";
    }

    button.textContent = "Show Message";        
    
});