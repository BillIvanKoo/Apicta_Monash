var express = require('express');
var router = express.Router();
var controller = require("../controllers/userController");
var passport = require("passport");

router.get('/', controller.findUsers);
router.get(':id', controller.findOneUser);
router.post('/signup', controller.addUser);
router.post('/signin', passport.authenticate('local', { session: false }), controller.createToken);

module.exports = router;
