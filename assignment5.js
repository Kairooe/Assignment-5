const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');


// Serve static files from public directory
app.use(express.static('public'));

// Route to serve JSON data
app.get('/api/cards', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'cards.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading cards data');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Route to serve HTML snippet
app.get('/api/featured-cards', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'featured-cards.html'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading featured cards');
            return;
        }
        res.send(data);
    });
});

app.listen(8000, () => {
    console.log('Server running on port 8000');
});