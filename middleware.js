const jwt = require('jsonwebtoken')

exports.verify = function(req, res, next){
    console.log(req.headers["jwt-token"]);
    let accessToken = req.headers["jwt-token"]

    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken){
        return res.status(403).send()
    }
    //use the jwt.verify method to verify the access token
    //throws an error if the token has expired or has a invalid signature
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err){
            console.log(err);
            res.status(401).send()
        } else {
            next()
        }
    })
}