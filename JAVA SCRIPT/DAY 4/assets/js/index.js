let age = 25

if (age >= 18) 

    { console.log("eligible");

}

else{
    console.log("not Eligible");
}


//EVEN OR ODD//

let number = 15;

if (number % 2 === 0) {
    console.log("Even");
} else {
    console.log("Odd");
}

// MARK //
 
let mark = 85;
if (mark >= 90 && mark <= 100 ) {
    console.log("a+")
}
else if (mark >= 75 && mark <= 89) {
    console.log("A");
}
else if ( mark >= 50 && mark <= 74) {
    console.log ("b");
}
else if (mark >= 35 && mark <= 47){
    console.log ("c");
}
else {
    console.log(fail);
}

// LOG IN CHECK //

let username = "tharun";
let password = "1234";

if (username === "tharun" && password === "1234") {
    console.log("Login_Success");
} else {
    console.log("Invalid_Login");
}
    
// DAY CHECK //

let day = 3;

switch (day) {
    case 1:
        console.log("Monday");
        break;

    case 2:
        console.log("Tuesday");
        break;

    case 3:
        console.log("Wednesday");
        break;

    case 4:
        console.log("Thursday");
        break;

    case 5:
        console.log("Friday");
        break;

    case 6:
        console.log("Saturday");
        break;

    case 7:
        console.log("Sunday");
        break;

    default:
        console.log("Invalid Day");
}