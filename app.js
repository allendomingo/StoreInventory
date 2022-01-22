const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// swagger documentation
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swagger.json');

// routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const suppliersRouter = require('./routes/suppliers')

// constants
const { getMongoUrl } = require('./constants/serverConfig')

// add .env to process.env
dotenv.config();

// connect to mongodb server
const connect = mongoose.connect(getMongoUrl());
console.log(`Connecting to ${process.env.NODE_ENV} environment`)
connect.then(() => {
	console.log('Connected correctly to server');
}, (err) => { console.log(err) });

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// add swagger documentation
const specs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// add routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/suppliers', suppliersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
