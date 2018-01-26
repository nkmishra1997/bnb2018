// Get dependencies
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || '3000';
const mongoose = require('mongoose');
const passport = require('passport');
const flash    = require('connect-flash');
var cron = require('cron');
const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const session      = require('express-session');
const configDB = require('./config/database.js');

// configuration ===============================================================

const Connection = function(configDB, callback){
  mongoose.connect(configDB.url, function(err){
    if (err) throw err
  })
  mongoose.connection.once('open', callback)
}

const callback = ()=>{
  console.log('MongoDB is live')
  app.listen(port);
  console.log('Magic happens on port ' + port)
}

Connection(configDB,callback)

// function databaseCheck(){
//   try{
//     Connection(configDB, callback)
//   } catch(e) {
//     console.log(e)
//     mongoose.disconnect()
//   }
// }
//
// databaseCheck()

require('./config/passport')(passport); // pass passport for configuration
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('./app/task')(cron);

app.use(express.static('views'));
app.get('/', function(req, res) {
        res.sendfile('./views/index.html'); // load the index.ejs file
    });

// Point static path to dist
app.use(express.static(path.join(__dirname, 'bnb/dist')));
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'stockMarket', // session secret
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
res.sendFile(path.join(__dirname+'/bnb/dist/index.html'));
});

module.exports = app
