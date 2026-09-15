let numbers = [10,20,30,40,50];

for(let i =0; i < numbers.length; i++){
    console.log(numbers[i]);
}

// task 2 //

let students = ["tharun","sakthi","shivu","ragav"]
for (let i = 0;i < students.length; i++){
    console.log(students[i]);
}

// task 3 //

let numeric = [ 10,48,53,35,75,36];
for (let i = 0 ; i < numbers.length;i++){
    if(numbers[i]%2===0){
        console.log(numbers[i]);

    }
}


// task 4 //


let student = [
    { name :"tharun",mark: 44},
    {name : "sakthi",mark: 56},
    {name : "shivu",mark: 45},
    {name : "kishore",mark:35},

]
for(let i=0; i < student.length;i++) {
    if(student[i].mark>50){
        console.log(student[i].name);
    }
}

//task 5//

let add = (a,b)=>{
    return a+b;
}
console.log(add(10,20));

// task 6 // 

let studentDetails = (name, mark) => {
    return "Student " + name + " scored " + mark + " marks";
};

console.log(studentDetails("Tharun", 85));