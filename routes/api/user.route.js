var express = require('express')

var router = express.Router()

// Getting the Commodity Controller that we just created

var UserController = require('../../controllers/user.controller');
//console.log("Inside Commodities route:"+CommodityController);


// Map each API to the Controller FUnctions

router.get('/', UserController.getAllUsers)

router.get('/:id', UserController.getUser)

router.post('/', UserController.createUser)

router.put('/', UserController.updateUser)

router.delete('/:id',UserController.removeUser)

router.get('/userName/:id', UserController.getByUserName)

router.put('/changePasswd', UserController.changePassword)
//console.log("Inside Commodities route:"+router);
// Export the Router

module.exports = router;
