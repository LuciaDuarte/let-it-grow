'use strict';

const { Router } = require('express');
const Plant = require('./../models/plant');

const plantsRouter = new Router();

plantsRouter.post('/new', (req, res, next) => {
  const { name, garden, nickname } = req.body;

  Plant.create({
    name,
    garden,
    nickname
  })
    .then(data => {
      console.log(data);
      res.json({ data });
    })
    .catch(error => {
      next(error);
    });
});

plantsRouter.get('/list', (req, res, next) => {
  const { garden } = req.query;

  Plant.find({ garden: garden })
    .then(data => {
      console.log(data);
      res.json({ data });
    })
    .catch(error => {
      next(error);
    });
});

plantsRouter.get('/single', (req, res, next) => {
  const { id } = req.query;

  Plant.findById(id)
    .then(data => {
      console.log(data);
      res.json({ data });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = plantsRouter;
