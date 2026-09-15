let fruits = ["Apple", "Mango", "Orange", "Banana"];

function showArray() {

    fruits.unshift("Grapes");

    fruits.shift();

    document.getElementById("result").innerText = fruits;

}s