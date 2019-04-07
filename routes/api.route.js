var express = require('express')

var router = express.Router()
var commodities = require('./api/commodity.route');
var users = require('./api/user.route');
var organizations = require('./api/organization.route');
var authenticate = require('./api/authentication.route');

//console.log("Inside api route:"+commodities);
router.use('/authenticate', authenticate);
router.use(require('../helpers/jwt'));
router.use('/commodities', commodities);
router.use('/users', users);
router.use('/organization', organizations);


module.exports = router;