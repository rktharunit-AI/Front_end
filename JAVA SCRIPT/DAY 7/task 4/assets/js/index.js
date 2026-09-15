let students = [
    {
        name: "tharun",
        age:22
    },
    {
        name: "kishore",
        age:23

    },
    {
        name: "ragav",
        age:24
    },
    
]

let target = "kishore";

for (let i=0; i < students.length; i++) {
    if (students[i].name === target) {
        console.log("Student found:", students[i]);
        break;
    }
}