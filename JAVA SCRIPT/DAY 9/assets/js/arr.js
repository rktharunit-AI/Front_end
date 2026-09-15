let factorial = (n) => {

    let result = 1;

    for (let i = 1; i <= n; i++) {
        result = result * i;
    }

    return result;
};


function calculateFactorial() {

    let number = Number(document.getElementById("number").value);

    let result = factorial(number);

    document.getElementById("result").innerText = result;
}