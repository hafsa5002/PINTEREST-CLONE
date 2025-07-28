const express = require('express');
const app = express();

// Routes
app.get('/', (req, res) => {
  res.send('Running on HTTP locally, HTTPS in production!');
});

module.exports = app;
