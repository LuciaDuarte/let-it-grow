'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  plants: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plant'
      }
  ],
  date: Date
});

module.exports = mongoose.model('Garden', schema);
