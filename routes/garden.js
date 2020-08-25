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

gardenRouter.get('/single', (req, res, next) => {
  const { gardenId } = req.query;

  Garden.findById(gardenId)
    .then(data => {
      console.log(data);
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
      res.json({});
    })
    .catch(error => {
      next(error);
    });
});

module.exports = gardenRouter;
