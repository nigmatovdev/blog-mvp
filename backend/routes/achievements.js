const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');
const auth = require('./auth').auth;

// Get all achievements
router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ year: -1 });
    res.json(achievements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single achievement
router.get('/:id', async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    res.json(achievement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create achievement (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { year, items } = req.body;
    
    const newAchievement = new Achievement({
      year,
      items
    });

    await newAchievement.save();
    res.status(201).json(newAchievement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update achievement (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const { year, items } = req.body;
    
    const updatedAchievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      { year, items },
      { new: true }
    );

    if (!updatedAchievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    res.json(updatedAchievement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete achievement (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    res.json({ message: 'Achievement deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 