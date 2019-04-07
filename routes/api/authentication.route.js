var express = require('express')

var router = express.Router()

// Getting the Authentication Controller that we just created

var AuthenticateController = require('../../controllers/authenticate.controller');
//console.log("Inside Commodities route:"+CommodityController);


// Map each API to the Controller FUnctions

router.post('/', AuthenticateController.authenticateUser);
// Export the Router

module.exports = router;