const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.static('public'));

app.get('/api/cards', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'pokemon.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading cards data');
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.get('/api/featured-cards', (req, res) => {
    fs.readFile(path.join(__dirname, 'html', 'magic.html'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading featured cards');
            return;
        }
        res.send(data);
    });
});

app.get('/api/card/:id', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'pokemon.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading card data');
            return;
        }
        const cards = JSON.parse(data);
        const card = cards[req.params.id];
        
        if (card) {
            res.json(card);
        } else {
            res.status(404).send('Card not found');
        }
    });
});

app.listen(8000, () => {
    console.log('Server running on port 8000');
});