const mongoose = require('mongoose');
const debug = require('debug')('development:mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  throw new Error(' MONGODB_URI is not defined in .env file');
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => debug(' MongoDB CONNECTED'))
  .catch((err) => {
    debug(' MongoDB CONNECTION ERROR:', err.message);
    process.exit(1); //  exit if db is required to run the app
  });

//  log disconnects or other events
mongoose.connection.on('disconnected', () => {
  debug('MongoDB DISCONNECTED');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  debug(' MongoDB connection closed due to app termination');
  process.exit(0);
});

module.exports = mongoose.connection;
