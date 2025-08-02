// db.js
const mongoose = require('mongoose');
const debug = require('debug')('development:mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  throw new Error('MONGODB_URI is not defined in the .env file');
}

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => debug(' MongoDB connected successfully'))
  .catch((err) => {
    debug(' MongoDB connection error:', err.message);
    process.exit(1); // Stop the app if DB is required
  });

//  Listen for disconnects
mongoose.connection.on('disconnected', () => {
  debug('⚠️ MongoDB disconnected');
});

//  handle app termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  debug('💡 MongoDB connection closed due to app termination');
  process.exit(0);
});

module.exports = mongoose.connection;
