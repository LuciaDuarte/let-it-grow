'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true
  },
  garden: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Garden'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  apiId: {
    type: String
  },
  image: String
});

module.exports = mongoose.model('Plant', schema);
