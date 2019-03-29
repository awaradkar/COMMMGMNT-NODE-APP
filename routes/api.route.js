var express = require('express')

var router = express.Router()
var commodities = require('./api/commodity.route');
var users = require('./api/user.route')

//console.log("Inside api route:"+commodities);
router.use('/commodities', commodities);
router.use('/users', users);

module.exports = router;