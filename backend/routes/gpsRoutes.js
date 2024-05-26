const express = require('express');
const { getStoppages } = require('../controllers/gpsController');

const router = express.Router();

router.get('/stoppages', getStoppages);

module.exports = router;
