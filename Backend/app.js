const express = require('express'); // Problem solved! Look at HTML for reference
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Use CORS
app.use(cors());

// Serve static files from the 'Frontend' directory
app.use(express.static(path.join(__dirname, '..', 'Frontend')));

console.log("Running app.js"); //Will print out in the console on vscode, NOT the web application console!

// Endpoint to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'Frontend', 'index.html'));
});

// Endpoint to get a random image
app.get('/randomImage', (req, res) => {
    console.log('Received request for random image');

    const imagesDir = path.join(__dirname, '..', 'countriesImages');
    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        }
        const randomIndex = Math.floor(Math.random() * files.length);
        const randomImage = files[randomIndex];
        const imagePath = path.join(imagesDir, randomImage);

        res.sendFile(imagePath);
    });
    // res.sendFile(path.join(__dirname, 'Frontend','index.html')) 
    // The above line results in an error as you are sending a file path to something that is not the image!   
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 