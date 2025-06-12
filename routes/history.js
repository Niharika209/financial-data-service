const express = require('express');
const router = express.Router();
const generateMockHistory = require('../mock-data/generateHistory');

// Route handler for historical stock price data
// Accepts query params: symbol, startDate, endDate, interval
router.get('/', (req, res) => {
  const { symbol, startDate, endDate, interval } = req.query;

  // Validate that all required query parameters are provided
  // Returns 400 Bad Request if any parameter is missing
  if (!symbol || !startDate || !endDate || !interval) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  const data = generateMockHistory(symbol, startDate, endDate, interval);
  res.json(data);
});

module.exports = router;
