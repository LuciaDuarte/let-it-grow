'use strict';

const { Router } = require('express');
const Plant = require('./../models/plant');
const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

const plantsRouter = new Router();

const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary.v2
});
const upload = multer({ storage });

plantsRouter.post('/new', upload.single('image'), (req, res, next) => {
  console.log('body',req.body)
  const { apiId, garden, nickname } = req.body;
  //console.log('running');
  console.log(req.file);
  let url;
  if (req.file) {
    url = req.file.path;
  }
  Plant.create({
    apiId,
    garden,
    nickname,
    image: url
  })
    .then(data => {
      console.log('this is data',data);
      res.json({ data });
    })
    .catch(error => {
      next(error);
    });
});

plantsRouter.get('/list', (req, res, next) => {
  const { garden } = req.query;

  Plant.find({ garden: garden })
    .then(data => {
      console.log(data);
      res.json({ data });
    })
    .catch(error => {
      next(error);
    });
});

plantsRouter.get('/single', (req, res, next) => {
  const { id } = req.query;

  Plant.findById(id)
    .then(data => {
      console.log(data);
      res.json({ data });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = plantsRouter;
