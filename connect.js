const mongoose = require('mongoose');

let isConnected = false;

async function connectToMongoDB(url) {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    await mongoose.connect(url);
    isConnected = true;
    console.log('New MongoDB connection established');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

module.exports = {
  connectToMongoDB,
};