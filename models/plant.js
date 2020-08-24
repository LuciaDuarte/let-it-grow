'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  garden: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Garden'
  },
  nickname: String,
  apiId: {
    type: String
  },
  image: String
});

module.exports = mongoose.model('Plant', schema);
