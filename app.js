// Load variables from the .env file (MONGO_URI) into process.env
require('dotenv').config({ quiet: true });

// Treat form dates as Toronto time. Render's servers run in UTC, so without
// this a session entered for 3:00 PM would be saved and shown as the wrong time.
process.env.TZ = 'America/Toronto';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');

// Connect to MongoDB Atlas using the connection string from .env
if (!process.env.MONGO_URI) {
  console.log('MONGO_URI is missing. Create a .env file (see .env.example).');
} else {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('MongoDB connection error:', err.message));
}

var app = express();

// view engine setup: EJS templates live in /views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // reads HTML form data into req.body
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // serves CSS, images

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;
