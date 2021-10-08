
   
const express = require('express');
const passport = require('passport');
const path = require('path');
const { isAdmin } = require('./authRoutesHelper');
const fakeDB = require('../db/fakeDB');
const { writeNewUser } = require('../db/fakeDBHelper')
const router = express.Router();

router.get('/login', (req, res) => {
  if(req.user) {
    return res.redirect('/users' + req.user.username)
  }
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/success');
      });
    })(req, res, next);
});

router.get('/register', isAdmin, (req, res) => {
  res.send('You are admin!!')
})

router.post('/register', isAdmin, (req, res) => {
  const { username, password, email, type } = req;
  if (!username || !password || !email || !type)  {
    return res.sendStatus(401);
  }

  writeNewUser(fakeDB, { username, password, email, type })
  
  res.send('You registered ', username)
})

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;