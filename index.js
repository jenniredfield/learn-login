require('dotenv').config()
const express = require('express');
const app = express();
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const { loggedIn } = require('./routes/authRoutesHelper');
const port = 3000;

require('./setup/auth');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.authenticate('session'));

app.use(authRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/success', loggedIn, (req, res) => {
    res.send('You are logged in!!')
});

app.get('/secret-space', loggedIn, (req, res) => {
    res.send('You are somewhere restrict!!')
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });

module.exports = app;
