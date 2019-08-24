const express = require('express');
const router = express.Router();
const controller = require('../controllers/packetController');

router.get('/', controller.getPackets);
router.get('/anomalies', controller.getAnomalies);
router.get('/hour/:time', controller.getPacketsInAnHour)
router.get('/:id', controller.getPacket);
router.post('/', controller.addPacket);

module.exports = router;