'use strict';

const { Router, request } = require('express');
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
  const { apiId, garden, nickname, owner } = req.body;

  let url;
  if (req.file) {
    url = req.file.path;
  }
  Plant.create({
    apiId,
    garden,
    nickname,
    owner,
    image: url
  })
    .then(data => {
      console.log('this is data', data);
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
      res.json({ data });
    })
    .catch(error => {
      next(error);
    });
});

plantsRouter.post('/delete/:id', (req, res, next) => {
  const id = req.params.id;
  console.log(id);

  Plant.findByIdAndDelete(id)
    .then(() => {
      res.json({});
    })
    .catch(error => {
      next(error);
    });
});

plantsRouter.post('/edit/:id', upload.single('image'), (req, res, next) => {
  const id = req.params.id;
  const { apiId, nickname} = req.body;
  let url;
    if (req.file) {
      url = req.file.path;
    }

  Plant.findByIdAndUpdate(
    id,
    { apiId, nickname, image:url }, 
    { new: true }
  )
    .then(data => {
      console.log(data);
      res.json({ data });
    })
    .catch(error => {
      next(error);
    });
});


module.exports = plantsRouter;
