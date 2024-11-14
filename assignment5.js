const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(express.static('public'));

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Route for Pokemon cards JSON
app.get('/api/pokemon-cards', (req, res) => {
    const filePath = path.join(__dirname, 'app', 'data', 'pokemon.json');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading pokemon.json:', err);
            res.status(500).send('Error reading cards data');
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).send('Invalid JSON format');
        }
    });
});

// Route for Magic cards HTML
app.get('/api/magic-cards', (req, res) => {
    const filePath = path.join(__dirname, 'app', 'html', 'magic.html');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading magic.html:', err);
            res.status(500).send('Error reading magic cards');
            return;
        }
        res.type('text/html').send(data);
    });
});

