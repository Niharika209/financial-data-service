const express = require('express');
const router = express.Router();
const indexes = require('../mock-data/indexes');

router.get('/', (req, res) => {
  res.json({ symbols: indexes });
});

module.exports = router;
// This code defines an Express router for handling requests to the `/api/v1/indexes` endpoint.
// It imports a mock data module containing stock symbols and responds with that data when a GET request is made to the root of this route.