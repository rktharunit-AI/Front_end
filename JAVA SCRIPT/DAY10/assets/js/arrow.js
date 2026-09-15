// Normal function
function add(a, b) {
    return a + b;
}


// Arrow function - explicit return
const addNumbers = (a, b) => {
    return a + b;
};


// Arrow function - implicit return
const addValues = (a, b) => a + b;


// Square
const square = n => n * n;

console.log(addNumbers(10, 20));
console.log(addValues(10, 20));
console.log(square(5));