document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("startButton");
    const startButtonBounds = document.querySelector(".startButtonBounds");
    const countriesButtonBounds = document.querySelector(".countriesButtonBounds");
    const countryButton = document.getElementById("countriesButton");
    const worldCountryQuestion = document.getElementById("worldCountryQuestion");
    const flagImg = document.getElementById("flagImg");
    const textBox = document.querySelector(".textBox");

    startButton.addEventListener("click", function() {
        console.log("Start Button Pressed!");
        fetch('http://localhost:3000/randomImage')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                const randImg = URL.createObjectURL(blob);
                flagImg.src = randImg;
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });

        startButtonBounds.style.display = 'none';
        worldCountryQuestion.style.display = 'block';
        flagImg.style.display = 'block';
        countriesButtonBounds.style.display = 'block';
        textBox.style.display = 'block';
    });

    countryButton.addEventListener("click", function() {
        console.log("Button Pressed!");

        let endpoint = document.getElementById("text-input").value;
        console.log("Endpoint: " + endpoint);
        let name = endpoint;

        fetch("countriesList.txt")
            .then(response => response.text())
            .then(text => {
                const lines = text.split('\n');
                lines.forEach(line => {
                    console.log("Lines Printed!");
                });

                let found = false;
                lines.forEach((line, index) => {
                    if (line.trim() === name) {
                        console.log("The name is in position " + (index + 1) + " of the text document");
                        found = true;
                    }
                });
                if (!found) {
                    console.log("The name is not in the text file");
                }
            })
            .catch(error => {
                console.error('Error fetching the file:', error);
            });
    });
});