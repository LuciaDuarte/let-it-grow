'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('./../models/user');

const authenticationRouter = new Router();

authenticationRouter.post('/sign-up', (req, res, next) => {
  const { name, email, password } = req.body;
  if (password.length < 8) throw new Error('Password is too short.');
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
      res.json({ user: { _id: user._id, name: user.name, email: user.email } });
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
        res.json({
          user: { _id: user._id, name: user.name, email: user.email }
        });
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

authenticationRouter.get('/me', (request, response) => {
  const user = request.user;
  response.json({
    user: { _id: user._id, name: user.name, email: user.email }
  });
});

module.exports = authenticationRouter;
