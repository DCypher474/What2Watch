import express from 'express';
import { auth } from '../middleware/auth';
import User from '../models/User';

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req: any, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

// Update user profile
router.put('/profile', auth, async (req: any, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// Add movie to watchlist
router.post('/watchlist/:movieId', auth, async (req: any, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const movieId = req.params.movieId;
    if (user.watchlist.includes(movieId)) {
      return res.status(400).json({ message: 'Movie already in watchlist' });
    }

    user.watchlist.push(movieId);
    await user.save();
    res.json({ message: 'Movie added to watchlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding movie to watchlist' });
  }
});

// Remove movie from watchlist
router.delete('/watchlist/:movieId', auth, async (req: any, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const movieId = req.params.movieId;
    user.watchlist = user.watchlist.filter(id => id.toString() !== movieId);
    await user.save();
    res.json({ message: 'Movie removed from watchlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing movie from watchlist' });
  }
});

// Get user's watchlist
router.get('/watchlist', auth, async (req: any, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('watchlist')
      .select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.watchlist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching watchlist' });
  }
});

export default router; 