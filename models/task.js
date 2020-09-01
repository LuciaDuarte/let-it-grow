'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
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
  done: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Task', schema);
