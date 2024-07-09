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

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
