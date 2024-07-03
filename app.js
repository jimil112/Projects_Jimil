// Import necessary modules
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import route handlers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Use the logger middleware for logging HTTP requests and errors
app.use(logger('dev'));

// Use built-in middleware for parsing JSON bodies
app.use(express.json());

// Use built-in middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// Use cookie-parser middleware for parsing cookies
app.use(cookieParser());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Mounting the index router on the root path
app.use('/', indexRouter);

// Mounting the users router on the '/users' path
app.use('/users', usersRouter);

// Exporingt the app object for use in other modules
module.exports = app;
