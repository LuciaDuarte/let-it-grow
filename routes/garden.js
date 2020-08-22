'use strict';

const { Router } = require('express');
const Garden = require('./../models/garden');

const gardenRouter = new Router();

gardenRouter.post('/new', (req, res, next) => {
  const { name, owner } = req.body;

  Garden.create({
    name,
    owner
  })
    .then(data => {
      console.log(data);
      res.json({ data });
    })
    .catch(error => {
      next(error);
    });
});

gardenRouter.get('/list', (req, res, next) => {
  const { user } = req.query;

  Garden.find({ owner: user })
    .then(data => {
      console.log(data);
      res.json({ data });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = gardenRouter;
