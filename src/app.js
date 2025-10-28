const express = require('express');

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares');

const app = express();
 
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());

const employees = require('./routes/employees');

app.use('/api/employees', employees);

const requestTime = require('./middlewares/requestTime');
app.use(requestTime);


const users = require('./routes/users');
app.use('/api/users', users);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
