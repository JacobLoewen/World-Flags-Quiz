document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("startButton");
    const startButtonBounds = document.querySelector(".startButtonBounds");
    const countriesButtonBounds = document.querySelector(".countriesButtonBounds");
    const countryButton = document.getElementById("countriesButton");
    const worldCountryQuestion = document.getElementById("worldCountryQuestion");
    const flagImg = document.getElementById("flagImg");
    const textBox = document.querySelector(".textBox");
    let currentFileName = "";

    startButton.addEventListener("click", function() {
        console.log("Start Button Pressed!");
        fetch('http://localhost:3000/randomImage')
            .then(response => response.json())
            .then(data => {
                currentFileName = data.filename;
                flagImg.src = `http://localhost:3000${data.imageUrl}`;
            })
            // .then(blob => {
            //     const randImg = URL.createObjectURL(blob);
            //     flagImg.src = randImg;
            // })
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
        console.log("File name:", currentFileName);

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
                    if (line.trim().toLowerCase() === name.trim().toLowerCase()) {
                        console.log("The name is in position " + (index + 1) + " of the text document");
                        // See if the currentFileName has the same numerical value as the line number in the text document. If so, then the user is correct!
                        let fileNumber = parseInt(currentFileName.substring(0, 3));
                        if (fileNumber === index + 1) {
                            console.log("Correct!");
                        }
                        else{
                            console.log("Incorrect!");
                        }
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