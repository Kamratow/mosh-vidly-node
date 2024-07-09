const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const Joi = require('joi');

app.use(express.json());

const genres = [
    { id: 1, name: 'Action' },  
    { id: 2, name: 'Horror' },  
    { id: 3, name: 'Romance' },
];

function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(genre);
}

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

app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const newGenre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(newGenre);

    res.send(newGenre);
});

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find((singleGenre) => singleGenre.id === parseInt(req.params.id));
    
    if(!genre) return res.status(404).send('Genre with given ID was not found');
    
    const { error } = validateGenre(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
