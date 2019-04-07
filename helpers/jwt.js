
var tokenJwt = require('jsonwebtoken');
var fs = require('fs');
var path = require('path')
var UserService = require('../services/user.service');
var promise = require('promise');

var signOptions = {
    algorithm: 'RS384'   // RSASSA [ "RS256", "RS384", "RS512" ]
};

var authenticateUrl = async function (req, res, next) {
    const headerInfo = req.headers['authorization'];
    var user = null;
    // decode token
    var token = headerInfo.trim().split(/\s+/)[1];
    console.log(token);
    var publicKEY = fs.readFileSync('/keys/public.key', 'utf8');
    console.log(publicKEY);
    if (token) {
        // verifies secret and checks exp
        try {
            tokenJwt.verify(token, publicKEY, signOptions, function (err, decoded) {
                if (err) {
                    return res.status(401).json({ "error": true, "message": 'Unauthorized access. Wrong token .' });
                }
                var userData = decoded;
                var userId = JSON.parse(userData.data)._userId;
                console.log(userId);
                try {
                    UserService.getUser(userId).then(function(promiseObj){
                        user = promiseObj;
                        if (user != null) {
                            if (token != user._token) {
                                return res.status(401).json({
                                    "error": true, "message": 'Unauthorized access. Expired or Invalid token .'
                                });
                            } else {
                                req.decoded = decoded;
                                next();
                            }
                        }
                    });
                }
                catch (e) {
                    console.log(e);
                    throw Error("Error Occured while Fetching Data")
                }
                
            });
        }
        catch (e) {
            console.log(e);
            throw Error("Error Occured while Authenticating Token")
        }
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            "error": true,
            "message": 'No token provided.'
        });
    }

}

module.exports = authenticateUrl;