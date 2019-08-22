const User = require('../models').User;
const userController = require('../controllers/userController');
const passport = require("passport");
const bcrypt = require("bcryptjs");

let passportAuth = (username, password, next) => {
    let findUser = User.findOne({ where:{username: username}})
    .then(user => {
        if (user === null) next(null, false, {message: 'Username is not found!'});
        bcrypt.compare(password, user.password, (err, res) => {
            if (err) {
                return next(err);
            } else {
                if (res) {
                    
                    return next(null, user);
                } else {
                    return next(null, false, {message: "Password is incorrect!"});
                }
            }
        })
    })
    .catch(err => {
        return next(null, false, {message: 'Username is not found!'});
    })
}

module.exports = passportAuth