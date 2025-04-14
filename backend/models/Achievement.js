const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
  items: [{
    type: String,
    required: true
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Achievement', AchievementSchema); 