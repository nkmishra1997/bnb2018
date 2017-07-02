// Get dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || '3000';


const app = express();
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'bnb/dist')));


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'bnb/dist/index.html'));
});

app.listen(port);
console.log('The magic happens on port ' + port);