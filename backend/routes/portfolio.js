const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Portfolio = require('../models/Portfolio');
const { auth } = require('./auth');

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, '..', 'uploads', 'portfolio');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Create a safe filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Get all portfolio items
router.get('/', async (req, res) => {
  try {
    const { type, search, sortBy = 'createdAt' } = req.query;
    let query = {};

    if (type && type !== 'all') {
      query.type = type;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const sortOptions = {
      createdAt: { createdAt: -1 },
      title: { title: 1 }
    };

    const items = await Portfolio.find(query)
      .sort(sortOptions[sortBy] || sortOptions.createdAt);

    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single portfolio item
router.get('/:id', async (req, res) => {
  try {
    const item = await Portfolio.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create portfolio item (admin only)
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, description, link, type, isFeatured } = req.body;
    
    const newItem = new Portfolio({
      title,
      description,
      image: req.file ? `/uploads/portfolio/${req.file.filename}` : '',
      link,
      type,
      isFeatured: isFeatured === 'true'
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Portfolio creation error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// Update portfolio item (admin only)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, description, link, type, isFeatured } = req.body;
    
    const updateData = {
      title,
      description,
      link,
      type,
      isFeatured: isFeatured === 'true'
    };

    if (req.file) {
      updateData.image = `/uploads/portfolio/${req.file.filename}`;
    }

    const updatedItem = await Portfolio.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete portfolio item (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Portfolio.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }

    // Delete the associated image file if it exists
    if (item.image) {
      const imagePath = path.join(__dirname, '..', item.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.json({ message: 'Portfolio item deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 