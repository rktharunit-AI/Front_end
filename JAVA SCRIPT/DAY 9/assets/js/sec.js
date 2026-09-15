function showEvenNumbers() {

    let n = Number(document.getElementById("number").value);

    let result = "";

    for (let i = 1; i <= n; i++) {

        if (i % 2 === 0) {
            result = result + i + " ";
        }

    }

    document.getElementById("result").innerText = result;
}