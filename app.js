'use strict';

const dotenv = require('dotenv');
dotenv.config();

const { join } = require('path');
const express = require('express');
const createError = require('http-errors');
const connectMongo = require('connect-mongo');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const logger = require('morgan');
const mongoose = require('mongoose');

const serveFavicon = require('serve-favicon');

const deserializeUser = require('./middleware/deserialize-user');
const bindUserToViewLocals = require('./middleware/bind-user-to-view-locals.js');

const cors = require('cors');

const authenticationRouter = require('./routes/authentication');
const openFarmRouter = require('./routes/openfarm');
const gardenRouter = require('./routes/garden');
const plantsRouter = require('./routes/plants');
const tasksRouter = require('./routes/tasks');

const app = express();

app.set('trust proxy', 1);

app.use(serveFavicon(join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(
  cors({
    origin: [process.env.CLIENT_APP_URL],
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 15,
      sameSite: 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    },
    store: new (connectMongo(expressSession))({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 24
    })
  })
);
app.use(deserializeUser);
app.use(bindUserToViewLocals);

app.use('/authentication', authenticationRouter);
app.use('/search', openFarmRouter);
app.use('/garden', gardenRouter);
app.use('/plants', plantsRouter);
app.use('/tasks', tasksRouter);

app.use('*', (request, response, next) => {
  const error = new Error('Page not found.');
  next(error);
});

app.use((error, request, response, next) => {
  response.status(400);
  response.json({ error: { message: error.message } });
});


module.exports = app;
