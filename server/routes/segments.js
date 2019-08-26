const express = require('express');
const router = express.Router();
const controller = require('../controllers/segmentController');
const jwtAuth = require('../utils/jwt');

router.get('/', controller.getSegments);
router.post('/', jwtAuth, controller.addSegment);

module.exports = router;