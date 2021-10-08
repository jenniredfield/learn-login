const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
const fakeDB = require('../db/fakeDB');
const verifyPass = require('../db/verifyPass');

passport.use(new LocalStrategy(
    (username, password, done) => {

      const user = fakeDB.find(user => user.username === username);
  
      if (!user) { 
        console.log('no username')
        return done(null, false, { message: 'Incorrect username.' });
     }

      if (!verifyPass(username, password)) { 
          console.log('incorrect password')
          return done(null, false, { message: 'Incorrect password.' }); 
     }
  
      return done(null, user);
    }
));


  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function(user, cb) {

    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username, type: user.type });
    });
  });

  passport.deserializeUser(function(user, cb) {
    const userFound = fakeDB.find(dbUser => dbUser.id === user.id)

    if (userFound && userFound.id) {
        return cb(null, user);
    }
  });