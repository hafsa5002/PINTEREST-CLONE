// middleware/isLoggedIn.js

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('MUST LOGIN TO GET ACCESS TO THIS ROUTE');
}

module.exports = { isLoggedIn };
