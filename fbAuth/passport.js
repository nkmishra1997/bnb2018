'use strict';
var passport = require('passport'),
FacebookTokenStrategy = require('passport-facebook-token'),
var parameters = require('../app/parameters');
var User = require('../app/models/customer')

module.exports = function () {
  passport.use(new FacebookTokenStrategy({
      clientID: configAuth.facebookAuth.clientID ,
      clientSecret: configAuth.facebookAuth.clientSecret
    },
    function (accessToken, refreshToken, profile, done) {
      User.upsertFbUser(accessToken, refreshToken, profile, function(err, user) {
        return done(err, user);
      });
    }));
};