const box = document.getElementById("box");
const button = document.getElementById("btn");
const style = document.createElement("style");

style.textContent = `
    #box {
        width: 200px;
        height: 100px;
        padding: 20px;
        background-color: lightgray;
        color: black;
    }
    .active {
        background-color: green;
        color: white;
    }
`;
document.head.appendChild(style);
button.addEventListener("click", () => {

    box.classList.add("active");

});