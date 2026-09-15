const title = document.getElementById('title');
const description = document.querySelectorAll('.description');
const descriptionButton = document.getElementById('description-button');


title.textContent = "this is a dom manipulation example";

description.forEach(tharun =>  {
    tharun.textContent = "this is a paragraph"; 
})    

