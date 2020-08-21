const express = require('express');

const token = process.env.TREFLE_API_TOKEN;
const axios = require('axios');
const baseUrl = 'https://trefle.io';

const trefleRouter = new express.Router();

trefleRouter.get('/list', async (req, res, next) => {
  const { query } = req.query;
  const response = await axios.get(
    `${baseUrl}/api/v1/species/search?q=${query}&token=${token}`
  );
  res.json(response.data);
});

module.exports = trefleRouter;
