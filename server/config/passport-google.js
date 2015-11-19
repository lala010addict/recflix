//var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../users/userModel');
var googleConfig = require('./auth');

module.exports = function(passport) {

  passport.use('google', new GoogleStrategy({
      clientID: googleConfig.googleAuth.appID,
      clientSecret: googleConfig.googleAuth.appSecret,
      callbackURL: googleConfig.googleAuth.callbackUrl
    },

    // google will send back the tokens and profile
    function(access_token, refresh_token, profile, done) {

      console.log('profile', profile);

      // asynchronous
      process.nextTick(function() {

        // find the user in the database based on their google id
        User.findOne({
          'google.id': profile.id
        }, function(err, user) {

          // if there is an error, stop everything and return that
          // ie an error connecting to the database
          if (err)
            return done(err);

          // if the user is found, then log them in
          if (user) {
            return done(null, user); // user found, return that user
          } else {
            // if there is no user found with that google id, create them
            var newUser = new User();

            // set all of the google information in our user model
            newUser.google.id = profile.id;
            newUser.google.token = access_token;
            newUser.google.name = profile.displayName;
            //  newUser.google.lastName = profile.name.displayName; // look at the passport user profile to see how names are returned
            //  newUser.google.email = profile.emails[0].value; // google can return multiple emails so we'll take the first

            // save our user to the database
            newUser.save(function(err) {
              if (err)
                throw err;

              // if successful, return the new user
              return done(null, newUser);
            });
          }

        });
      });

    }));

};
