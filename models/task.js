'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  task: String,
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plant'
  },
  garden: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Garden'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['done', 'not done'],
    default: 'not done'
  },
  date: Date
});

module.exports = mongoose.model('Task', schema);
