const express = require('express');
const router = express.Router();
const { computeRateFromPA, computeAmountFromPR } = require('../lib/calc');

// POST /compound-interest
// Accepts JSON with either (principal, amount, time) to compute rate
// or (principal, rate, time) to compute amount.
router.post('/', (req, res) => {
  const { principal, amount, time, rate } = req.body;

  if (principal === undefined || time === undefined) {
    return res.status(400).json({ error: 'Missing required fields: principal and time are required.' });
  }

  // Find rate if amount provided
  if (amount !== undefined && amount !== null) {
    if (isNaN(principal) || isNaN(amount) || isNaN(time)) {
      return res.status(400).json({ error: 'principal, amount and time must be numbers' });
    }
    const result = computeRateFromPA(Number(principal), Number(amount), Number(time));
    return res.json(result);
  }

  // Find amount if rate provided
  if (rate !== undefined && rate !== null) {
    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
      return res.status(400).json({ error: 'principal, rate and time must be numbers' });
    }
    const result = computeAmountFromPR(Number(principal), Number(rate), Number(time));
    return res.json(result);
  }

  return res.status(400).json({ error: 'Either amount or rate must be provided.' });
});

module.exports = router;
