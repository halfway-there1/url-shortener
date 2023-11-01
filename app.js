require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const createError = require('http-errors');

// require routes
const indexRouter = require('./routes/index');

// setting up mongoose and mongoDB
const mongoose = require('mongoose');
async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('db connected');
  } catch (err) {
    console.log(err);
  }
}
main();

const app = express();

// views folder and view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
// add static files folder
app.use(express.static(path.join(__dirname, 'public')));

// setting routes
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// default error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}`);
});
