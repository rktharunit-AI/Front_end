const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const cityInput = document.getElementById("city");
const button = document.getElementById("addStudent");
const studentList = document.getElementById("studentList");
const students = [];

button.addEventListener("click", () => {
    const student = {
        name: nameInput.value,
        age: ageInput.value,
        city: cityInput.value
    };
    students.push(student);
    studentList.innerHTML = "";
    students.forEach((student) => {
 const div = document.createElement("div");
       div.innerHTML = `
            <h3>${student.name}</h3>
            <p>Age: ${student.age}</p>
            <p>City: ${student.city}</p>
            <hr>
        `;

        studentList.appendChild(div);
    });
    nameInput.value = "";
    ageInput.value = "";
    cityInput.value = "";

});