function processNumber(number, callback) {

    let result = number * 2;

    callback(result);

}

function displayResult(result) {

    document.getElementById("result").innerText = result;

}

function startProcess() {

    processNumber(10, displayResult);

}