// middleware/isLoggedIn.js

 function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // User is logged in
  }
  res.redirect('login'); // Redirect if not authenticated
};

 module.exports= {isLoggedIn}