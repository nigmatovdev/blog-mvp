const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Portfolio = require('../models/Portfolio');
const Contact = require('../models/Contact');
const Achievement = require('../models/Achievement');

const checkDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB successfully!');

    // Check each collection
    console.log('\nChecking Users collection:');
    const users = await User.find({});
    console.log(JSON.stringify(users, null, 2));

    console.log('\nChecking Portfolio collection:');
    const portfolios = await Portfolio.find({});
    console.log(JSON.stringify(portfolios, null, 2));

    console.log('\nChecking Contact collection:');
    const contacts = await Contact.find({});
    console.log(JSON.stringify(contacts, null, 2));

    console.log('\nChecking Achievements collection:');
    const achievements = await Achievement.find({});
    console.log(JSON.stringify(achievements, null, 2));

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkDatabase(); 