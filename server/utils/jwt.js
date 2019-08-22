const jwt = require('jsonwebtoken');

let jwtAuthenticate = (req, res, next) => {
    jwt.verify(req.headers.token, 'secret', (err, decoded)=> {
        if (decoded){
            req.user = decoded
            next()
        }
        if(err) res.send(err);
    })
}

module.exports = jwtAuthenticate