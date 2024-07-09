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
    const genre = genres.find((singleGenre) => singleGenre.id === parseInt(req.params.id));
    
    if(!genre) return res.status(404).send('Genre with given ID was not found');

    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find((singleGenre) => singleGenre.id === parseInt(req.params.id));
    
    if(!genre) return res.status(404).send('Genre with given ID was not found');

    const genreToDeleteIndex = genres.indexOf(genre);
    genres.splice(genreToDeleteIndex, 1);

    res.send(genre);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
