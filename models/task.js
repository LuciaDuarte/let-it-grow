'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date
});

module.exports = mongoose.model('Task', schema);
