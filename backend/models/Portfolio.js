const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  link: {
    type: String,
    required: false
  },
  type: {
    type: String,
    enum: ['web', 'mobile', 'design'],
    required: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Portfolio', PortfolioSchema); 