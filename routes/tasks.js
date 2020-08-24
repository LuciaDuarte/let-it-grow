'use strict';

const { Router } = require('express');
const Task = require('./../models/task');

const tasksRouter = new Router();

tasksRouter.post('/new', (req, res, next) => {
  const { task, date, plant } = req.body;
  console.log(req.body);

  Task.create({
    task,
    date: new Date(date),
    plant
  })
    .then(data => {
      console.log(data);
      res.json({ data });
    })
    .catch(error => {
      next(error);
    });
});

tasksRouter.get('/list', (req, res, next) => {
  const { id } = req.query;

  Task.find({ plant: id })
    .sort({ date: 1 })
    .then(data => {
      console.log(data);
      res.json({ data });
    })
    .catch(error => {
      next(error);
    });
});

tasksRouter.get('/single', (req, res, next) => {
  const { id } = req.query;

  Task.findById(id)
    .then(data => {
      console.log(data);
      res.json({ data });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = tasksRouter;
