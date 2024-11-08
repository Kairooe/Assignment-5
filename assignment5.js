const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Route for Pokemon cards JSON
app.get('/api/cards', (req, res) => {
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

// Add this new route for individual card details
app.get('/api/card/:id', (req, res) => {
    const filePath = path.join(__dirname, 'app', 'data', 'pokemon.json');
    const id = parseInt(req.params.id);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading pokemon.json:', err);
            res.status(500).send('Error reading card data');
            return;
        }
        try {
            const cards = JSON.parse(data);
            if (id >= 0 && id < cards.length) {
                res.json(cards[id]);
            } else {
                res.status(404).send('Card not found');
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).send('Invalid JSON format');
        }
    });
});

// Route for Magic cards HTML
app.get('/api/featured-cards', (req, res) => {
    const filePath = path.join(__dirname, 'app', 'html', 'magic.html');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading magic.html:', err);
            res.status(500).send('Error reading featured cards');
            return;
        }
        res.type('text/html').send(data);
    });
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});