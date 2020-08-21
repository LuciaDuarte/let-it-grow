'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  garden: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Garden'
  },
  plant_id: Number,
  plant_nickname: String,
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: String,
  optimal_sun: String,
  optimal_soil: {
    type:String,
    enum: [
      "Loamy",
      "Sandy",
      "Neutral pH",
      "Mildly Acidic to Neutral pH",
      "Acidic pH"
    ]
  },
  planting_considerations: String,
  when_to_plant: String,
  growing_from_seed: String,
  transplanting: String,
  spacing: String,
  watering: String,
  feeding: String,
  other_care: String,
  diseases: String,
  pests: String,
  harvesting: String,
  storage_use: String,
  image_url: String
});

module.exports = mongoose.model('Plant', schema);

