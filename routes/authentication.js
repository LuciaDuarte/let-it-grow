'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('./../models/user');

const authenticationRouter = new Router();

authenticationRouter.post('/sign-up', (req, res, next) => {
  const { name, email, password } = req.body;
  bcryptjs
    .hash(password, 10)
    .then(hash => {
      return User.create({
        name,
        email,
        passwordHash: hash
      });
    })
    .then(user => {
      req.session.user = user._id;
      res.json({ user });
    })
    .catch(error => {
      next(error);
    });
});

authenticationRouter.post('/sign-in', (req, res, next) => {
  let user;
  const { email, password } = req.body;
  User.findOne({ email })
    .then(document => {
      if (!document) {
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        user = document;
        return bcryptjs.compare(password, user.passwordHash);
      }
    })
    .then(result => {
      if (result) {
        req.session.user = user._id;
        res.json({ user });
      } else {
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch(error => {
      next(error);
    });
});

authenticationRouter.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.json({});
});

module.exports = authenticationRouter;

// const express = require('express');
// const bcrypt = require('bcryptjs');

// const User = require('./../models/user');

// const authenticationRouter = new express.Router();

// authenticationRouter.post('/sign-up', async (request, response, next) => {
//   const { name, email, password } = request.body;
//   try {
//     if (password.length < 8) throw new Error('Password is too short.');
//     const hashAndSalt = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       name,
//       email,
//       passwordHashAndSalt: hashAndSalt
//     });
//     request.session.userId = user._id;
//     response.json({
//       user: { _id: user._id, name: user.name, email: user.email }
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// authenticationRouter.post('/sign-in', async (request, response, next) => {
//   const { email, password } = request.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) throw new Error('No user with that email.');
//     const passwordHashAndSalt = user.passwordHashAndSalt;
//     const comparison = await bcrypt.compare(password, passwordHashAndSalt);
//     if (!comparison) throw new Error('Password did not match.');
//     request.session.userId = user._id;
//     response.json({ user: { name: user.name, email: user.email } });
//   } catch (error) {
//     next(error);
//   }
// });

// authenticationRouter.post('/sign-out', (request, response) => {
//   request.session.destroy();
//   response.json({});
// });

// authenticationRouter.get('/me', (request, response) => {
//   const user = request.user;
//   response.json({ user });
// });

// module.exports = authenticationRouter;
