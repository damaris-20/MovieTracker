const express = require('express');
const cors = require('cors');
const app = express();

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   next();
// });
app.use(cors());
app.use(express.json());
let movies = [
  { id: 1, title: "Inception", year: 2010,  rating: 4 },
  { id: 2, title: "The Matrix", year: 1999,  rating: 3 }
];

app.get('/movies', (req, res) => res.json(movies));
app.get('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ error: 'Movie not found' });
  res.json(movie);
});
app.post('/movies', (req, res) => {
  const { title, year } = req.body;
  if (!title || !year) return res.status(400).json({ error: 'Title and year are required' });
  const newMovie = {
    id: movies.length ? movies[movies.length - 1].id + 1 : 1,
    title,
    year: parseInt(year)
  };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});
app.put('/movies/:id', (req, res) => {
  const { id } = req.params;
  const { title, year } = req.body;
  const movie = movies.find(m => m.id === parseInt(id));
  if (!movie) return res.status(404).json({ error: 'Movie not found' });
  if (!title || !year) return res.status(400).json({ error: 'Title and year are required' });
  movie.title = title;
  movie.year = parseInt(year);
  res.json(movie);
});
app.delete('/movies/:id', (req, res) => {
  const { id } = req.params;
  const index = movies.findIndex(m => m.id === parseInt(id));
  if (index === -1) return res.status(404).json({ error: 'Movie not found' });
  movies.splice(index, 1);
  res.status(204).send();
});

app.listen(3001, () => console.log('Server running on port 3001'));