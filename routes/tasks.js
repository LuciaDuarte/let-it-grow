'use strict';

const { Router } = require('express');
const Task = require('./../models/task');

const tasksRouter = new Router();

tasksRouter.post('/new', (req, res, next) => {
  const { task, date, plant, owner, garden } = req.body;

  Task.create({
    owner,
    garden,
    task,
    date: new Date(date),
    plant
  })
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      next(error);
    });
});

tasksRouter.get('/list/single', (req, res, next) => {
  const { id } = req.query;
  const today = new Date();

  Task.find({ plant: id, done: 0, date: { $gte: today } })
    .sort({ date: 1 })
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      next(error);
    });
});

tasksRouter.get('/list/all', (req, res, next) => {
  const { id } = req.query;

  Task.find({ owner: id })
    .sort({ date: 1 })
    .populate('plant')
    .populate('garden')
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      next(error);
    });
});

tasksRouter.post('/update', (req, res, next) => {
  const { id } = req.body;

  Task.findByIdAndUpdate(id, {
    $bit: {
      done: { xor: 1 }
    }
  })
    .then(data => {
      res.json({ data });
    })
    .catch(error => {
      next(error);
    });
});

// tasksRouter.get('/single', (req, res, next) => {
//   const { id } = req.query;

//   Task.findById(id)
//     .then(data => {
//       res.json({ data });
//     })
//     .catch(error => {
//       next(error);
//     });
// });

module.exports = tasksRouter;
