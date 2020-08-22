'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  plants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plant'
    }
  ]
});

module.exports = mongoose.model('Garden', schema);
