function createCounter() {

    let count = 0;

    return function() {

        count++;

        return count;

    };

}

let counter = createCounter();

function runCounter() {

    let result = counter();

    document.getElementById("result").innerText = result;

}