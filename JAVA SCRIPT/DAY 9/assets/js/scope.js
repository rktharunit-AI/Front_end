let globalName = "Tharun";

function showScope() {

    var age = 25;

    if (true) {

        let city = "Chennai";
        const country = "India";

        document.getElementById("result").innerHTML =
            "Global Name: " + globalName + "<br>" +
            "Age: " + age + "<br>" +
            "City: " + city + "<br>" +
            "Country: " + country;
    }
}
