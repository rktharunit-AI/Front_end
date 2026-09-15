let employees = [
    {
        name:"tharun",
        salary: 10000
    },
    {
        name:"sai ",
        salary: 20000   

    },
    {
        name:"sakthi",
        salary: 30000

    },
    {
        name:"karthik",  
        salary: 40000
    }
];
for (let i=0; i<employees.length; i++){
    if(employees[i].salary>20000){
        console.log(employees[i].name);
    }
}