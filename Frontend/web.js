document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("startButton");
    const startButtonBounds = document.querySelector(".startButtonBounds");

    const countriesButtonBounds = document.querySelector(".countriesButtonBounds");
    const countryButton = document.getElementById("countriesButton");

    const worldCountryQuestion = document.getElementById("worldCountryQuestion");
    const flagImg = document.getElementById("flagImg");
    const textBox = document.querySelector(".textBox");
    const textInput = document.getElementById("text-input");

    const resultText = document.getElementById("resultText");
    const nextButtonBounds = document.querySelector(".nextButtonBounds");
    const nextButton = document.getElementById("nextButton");

    let currentFileName = "";

    function loadNewFlag() {
        fetch("http://localhost:3000/randomImage")
            .then(response => response.json())
            .then(data => {
                currentFileName = data.filename;
                flagImg.src = `http://localhost:3000${data.imageUrl}`;
            })
            .catch(error => {
                console.error("There has been a problem with your fetch operation:", error);
            });
            

        textInput.value = "";
        textInput.disabled = false;

        resultText.style.display = "none";
        resultText.textContent = "";
        resultText.className = "";

        countryButton.style.display = "inline-block";
        countriesButtonBounds.style.display = "block";

        nextButtonBounds.style.display = "none";
    }

    startButton.addEventListener("click", function () {
        console.log("Start Button Pressed!");

        startButtonBounds.style.display = "none";
        worldCountryQuestion.style.display = "block";
        flagImg.style.display = "block";
        countriesButtonBounds.style.display = "block";
        textBox.style.display = "block";

        loadNewFlag();
    });

    countryButton.addEventListener("click", function () {
        console.log("File name:", currentFileName);

        const name = textInput.value.trim();

        fetch("countriesList.txt")
            .then(response => response.text())
            .then(text => {
                const lines = text.split("\n");

                let found = false;
                let correctAnswer = "";
                let isCorrect = false;

                const fileNumber = parseInt(currentFileName.substring(0, 3));

                lines.forEach((line, index) => {
                    const aliases = line
                        .trim()
                        .split(",")
                        .map(alias => alias.trim());

                    if (index + 1 === fileNumber) {
                        correctAnswer = aliases[0];
                    }

                    if (aliases.some(alias => alias.toLowerCase() === name.toLowerCase())){
                        found = true;

                        if (fileNumber === index + 1) {
                            isCorrect = true;
                        }
                    }
                });

                resultText.style.display = "block";

                if (isCorrect) {
                    resultText.textContent = "Correct!";
                    resultText.className = "correct";
                } else {
                    resultText.innerHTML =
                        "Incorrect!<br>" +
                        "Correct Answer: " + correctAnswer;
                    resultText.className = "incorrect";
                }

                textInput.disabled = true;
                countryButton.style.display = "none";
                nextButtonBounds.style.display = "block";
            })
            .catch(error => {
                console.error("Error fetching the file:", error);
            });
    });

    nextButton.addEventListener("click", function () {
        nextButtonBounds.style.display = "none";

        loadNewFlag();
    });
});