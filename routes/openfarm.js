const express = require('express');

const axios = require('axios');

const baseUrl = 'https://openfarm.cc/api/v1/crops';

const openFarmRouter = new express.Router();

openFarmRouter.get('/list', async (req, res, next) => {
  const { query } = req.query;
  const response = await axios.get(`${baseUrl}/?filter=${query}`);
  res.json(response.data);
});

openFarmRouter.get('/single', async (req, res, next) => {
  const { apiId } = req.query;
  const response = await axios.get(`${baseUrl}/${apiId}`);
  res.json(response.data);
});

module.exports = openFarmRouter;
