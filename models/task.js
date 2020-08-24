'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  task: String,
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plant'
  },
  date: Date
});

module.exports = mongoose.model('Task', schema);
