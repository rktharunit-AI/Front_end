const numbers = [10, 20, 30];

function copyArray() {

    let newArray = [];

    for (let i = 0; i < numbers.length; i++) {

        newArray[i] = numbers[i];

    }

    newArray[newArray.length] = 40;

    document.getElementById("result").innerText = newArray;

}