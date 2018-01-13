const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
session({
  secret: process.env.APP_SECRET || 'this is the default passphrase',
  // store: new MongoStore({ mongooseConnection: dbConnection }),
  resave: false,
  saveUninitialized: false
})
);

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI ||
    'mongodb://localhost/gottago2',
  {
    useMongoClient: true
  }
);

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
