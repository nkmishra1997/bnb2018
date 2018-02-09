// load all the things we need
var FacebookStrategy = require('passport-facebook').Strategy;
// var FacebookTokenStrategy = require('passport-facebook-token');
 
var parameters = require('../app/parameters');
// load up the user model
var User       = require('../app/models/customer');

// load the auth variables
var configAuth = require('./auth'); // use this one for testing

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


    //=========================================================================
    //== FaceBook Token =======================================================
    //=========================================================================

    // passport.use(new FacebookTokenStrategy({
    //     clientID: configAuth.facebookAuth.clientID,
    //     clientSecret: configAuth.facebookAuth.clientSecret
    // }, function(accessToken, refreshToken, profile, done) {
    //     // console.log(accessToken);
    //     // console.log(profile);

    //     User.findOne({ 'facebook.id' : profile.id }, function (error, user) {
    //     return done(error, user);
    //     });
    // }
    // ));





    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    var fbStrategy = configAuth.facebookAuth;
    fbStrategy.passReqToCallback = true;  // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    passport.use(new FacebookStrategy(fbStrategy,
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // console.log(profile);

            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.facebook.token) {
                            user.facebook.token = token;
                            user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                            user.facebook.email = (profile.emails[0].value || '').toLowerCase();

                            user.save(function(err) {
                                if (err)
                                    return done(err);
                                return done(null, user);
                            });
                        }

                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user, create them
                        var newUser            = new User();
                        try {
                            newUser.facebook.id    = profile.id;
                            newUser.facebook.token = token;
                            newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                            if (profile.emails){
                                newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();
                            }
                            newUser.accountBalance = parameters.accountBalance;
                            newUser.ban = false;
                            newUser.loan.taken = false;
                            newUser.loan.amount = 0;
                            // console.log(newUser);

                        } catch (err){
                            console.log(err);
                        }
                        newUser.save(function(err) {
                            if (err)
                                return done(err);
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user            = req.user; // pull the user out of the session

                user.facebook.id    = profile.id;
                user.facebook.token = token;
                user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebook.email = (profile.emails[0].value || '').toLowerCase();
                user.save(function(err) {
                    if (err)
                        return done(err);
                    return done(null, user);
                });

            }
        });

    }));
};
