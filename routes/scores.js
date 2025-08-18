const express = require('express');
const { submitScore, getScores } = require('../controllers/scoreController');
const router = express.Router();

router.post('/', submitScore);
router.get('/', getScores);

module.exports = router;
