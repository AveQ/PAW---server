const express = require('express');
const router = express.Router();
const ChartDataController = require('../controllers/chartData');

// GET 3 RANDOM NUMBERS 0-10

router.get('/', ChartDataController.chart_data);

module.exports = router;