import express from 'express';
import { auth } from '../middleware/auth';
import Movie from '../models/Movie';

const router = express.Router();

// Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies' });
  }
});

// Get movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movie' });
  }
});

// Add movie to database
router.post('/', auth, async (req: any, res) => {
  try {
    const { title, overview, posterPath, releaseDate, voteAverage, tmdbId } = req.body;

    // Check if movie already exists
    const existingMovie = await Movie.findOne({ tmdbId });
    if (existingMovie) {
      return res.status(400).json({ message: 'Movie already exists' });
    }

    const movie = new Movie({
      title,
      overview,
      posterPath,
      releaseDate,
      voteAverage,
      tmdbId,
    });

    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Error adding movie' });
  }
});

export default router; 