var express = require('express')

var router = express.Router()
var commodities = require('./api/commodity.route');

//console.log("Inside api route:"+commodities);
router.use('/commodities', commodities);

module.exports = router;