const box = document.getElementById("box");
const button = document.getElementById("button");
const style = document.getElementById("style");

style.textContent = "background-color: red; width: 100px; height: 100px;";

button.addEventListener("click", function() {
    if (box.style.display === "none") {
        box.style.display = "block";
        button.textContent = "Hide Box";
    } else {
        box.style.display = "none";
        button.textContent = "Show Box";
    }
});