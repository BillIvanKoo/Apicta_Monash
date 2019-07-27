const express = require('express');
const router = express.Router();
const controller = require('../controllers/packetController');

router.get('/', controller.getPackets);
router.get('/:id', controller.getPacket);
router.post('/', controller.addPacket);

module.exports = router;