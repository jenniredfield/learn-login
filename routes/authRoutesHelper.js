function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

function isAdmin(req, res, next) {
  if (req.user.type === 'admin') {
      next();
  } else {
      res.redirect('/');
  }
}

module.exports = { loggedIn, isAdmin };