const Segment = require("../models").Segment;

addSegment = (req, res) => {
    Segment.create({...req.body, userId: Number(req.user.id)})
    .then(seg => {res.send(seg)})
    .catch(err => {res.send(err)})
}

getSegments = (_, res) => {
    Segment.findAll({})
    .then(regs => {res.send(regs)})
    .catch(err => {res.send(err)})
}

module.exports = { addSegment, getSegments }