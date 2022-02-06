const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const contactsRouter = require('./routes/contacts');
const suppliersRouter = require('./routes/suppliers');
const customersRouter = require('./routes/customers');
const transactionsRouter = require('./routes/transactions');
const inventoryRouter = require('./routes/inventory');

// constants
const { getMongoUrl } = require('./constants/serverConfig');

// add .env to process.env
dotenv.config();

// connect to mongodb server
const connect = mongoose.connect(getMongoUrl());
console.log(`Connecting to ${process.env.NODE_ENV} enviroment`);
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

// swagger documentation
if (process.env.NODE_ENV === 'development') {
	const swaggerUi = require('swagger-ui-express');
	const swaggerFile = require('./bin/swagger-output.json');
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
}

// add routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacts', contactsRouter);
app.use('/suppliers', suppliersRouter);
app.use('/customers', customersRouter);
app.use('/transactions', transactionsRouter);
app.use('/inventory', inventoryRouter);

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
