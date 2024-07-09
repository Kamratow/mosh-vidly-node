const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const genres = [
    { id: 1, name: 'Action' },  
    { id: 2, name: 'Horror' },  
    { id: 3, name: 'Romance' },
];

app.get('/', (_req, res) => {
    res.send('Hello world');
});

app.get('/api/genres', (_req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const selectedGenre = genres.find((singleGenre) => singleGenre.id === parseInt(req.params.id));
    
    if(!selectedGenre) return res.status(404).send('Genre with given ID was not found');

    res.send(selectedGenre);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
