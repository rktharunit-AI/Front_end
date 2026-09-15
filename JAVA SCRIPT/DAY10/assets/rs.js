function addNumbers(...numbers) {
    let total = 0;

    numbers.forEach(function(number) {
        total = total + number;
    });

    return total;
}

console.log(addNumbers(10, 20, 30, 40));