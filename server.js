// Get dependencies
const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || '3000';
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

var configDB = require('./bnb/AuthFB/config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url,function(err){
    if(err) console.log('Error');
    else console.log('Connected to DB');
}); // connect to our database

require('./bnb/AuthFB/config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'bnb/dist')));
app.set('view engine', 'ejs'); // set up ejs for templating

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
require('./bnb/AuthFB/app/routesfb.js')(app, passport); // load our routes and pass in our app and fully configured passport


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'bnb/dist/index.html'));
});

app.listen(port);
console.log('The magic happens on port ' + port);