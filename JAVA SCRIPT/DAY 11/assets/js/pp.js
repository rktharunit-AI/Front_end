let fruits = ["Apple", "Mango", "Orange", "Banana", "Grapes"];

function showArray() {

    fruits.push("Watermelon");
    fruits.push("Pineapple");

    fruits.pop();

    document.getElementById("result").innerText = fruits;

}