'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');
//const axios = require('axios');

router.get('/', (req, res, next) => {
  res.json({ type: 'success', data: { title: 'Hello World' } });
});

// router.get('/test', async (req, res, next) => {
//   const response = await axios.get(
//     'https://trefle.io/api/v1/species/search?q=apple&token=NY8LIG5sCiQHAu_UyY1hnjgdgTq94olDTdeXO_3IGME'
//   );
//   console.log(response.data);
//   res.json({ data: response.data });
// });

router.get('/private', routeGuard, (req, res, next) => {
  res.json({});
});

module.exports = router;
