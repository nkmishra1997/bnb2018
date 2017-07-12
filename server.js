// Get dependencies
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || '3000';
const mongoose = require('mongoose');
const passport = require('passport');
const flash    = require('connect-flash');

const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const session      = require('express-session');
const configDB = require('./config/database.js');

// configuration ===============================================================

var Connection = function(configDB, callback){
  mongoose.connect(configDB.url);
  mongoose.connection.once('open', callback);
};

Connection(configDB, ()=>{
  console.log('MongoDB is live');
  app.listen(port);
  console.log('Magic happens on port ' + port);
});
 // connect to our database});

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'bnb/dist')));

// required for passport
app.use(session({
    secret: 'fbloginboilerplate', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'bnb/dist/index.html'));
});
