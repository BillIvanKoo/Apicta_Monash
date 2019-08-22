const User = require('../models').User;
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");

findUsers = (req, res) => {
    User.findAll({}).then( users =>{
        res.send(users);
    })
}

findOneUser = (req, res) => {
    User.findOne({
        where: {
            id: Number(req.params.id)
        }
    })
    .then( user =>{
        res.send(user);
    })
}

addUser = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        console.log(hash)
        if (err) res.send(err);
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        .then( user =>{
            res.send(user)
        })
        .catch( err => {
            res.send(err)
        })
    });
    
}

createToken = (req, res) => {
    User.findOne({
        where: {
            username: req.user.username
        }
    })
    .then( user => {
        res.send(jwt.sign({
            id:user.id
        }, 'secret', { expiresIn: '24h' }))
    })
}

module.exports = {findUsers, findOneUser, addUser, createToken}