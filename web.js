document.addEventListener("DOMContentLoaded", function() {

	const startButton = document.getElementById("button");

    startButton.addEventListener("click", function() {
        console.log("Button Pressed!")

        endpoint = document.getElementById("text-input").value;
        console.log("Endpoint: " + endpoint);
    })
})