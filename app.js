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
const indexRouter = require('./routes/index');
const authenticationRouter = require('./routes/authentication');
const trefleRouter = require('./routes/trefle');
const gardenRouter = require('./routes/garden');
const plantsRouter = require('./routes/plants');

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

app.use('/', indexRouter);
app.use('/authentication', authenticationRouter);
app.use('/search', trefleRouter);
app.use('/garden', gardenRouter);
app.use('/plants', plantsRouter);

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ type: 'error', error: { message: error.message } });
});

module.exports = app;
