'use strict';

const { Router } = require('express');
const Garden = require('./../models/garden');
const Task = require('./../models/task');
const Plant = require('./../models/plant');

const gardenRouter = new Router();

gardenRouter.post('/new', (req, res, next) => {
  const { name, owner } = req.body;

  Garden.create({
    name,
    owner
  })
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      next(error);
    });
});

gardenRouter.get('/list', (req, res, next) => {
  const { user } = req.query;

  Garden.find({ owner: user })
    .populate('plants')
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      next(error);
    });
});

gardenRouter.get('/single', (req, res, next) => {
  const { gardenId } = req.query;

  Garden.findById(gardenId)
    .populate('plants')
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      next(error);
    });
});

gardenRouter.post('/delete/:id', (req, res, next) => {
  const id = req.params.id;

  Garden.findByIdAndDelete(id)
    .then(() => {
      //  res.json({});
      return Plant.deleteMany({ garden: id });
    })
    .then(tasks => {
      //  res.json({});
      return Task.deleteMany({ garden: id });
    })
    .then(plants => {
      res.json({});
    })
    .catch(error => {
      next(error);
    });
});

module.exports = gardenRouter;
