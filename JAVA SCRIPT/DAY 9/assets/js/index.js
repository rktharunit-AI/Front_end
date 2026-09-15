function add(a, b) {
    return a + b;
}

function calculateSum() {

    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);

    let result = add(num1, num2);

    document.getElementById("result").innerText = result;
}