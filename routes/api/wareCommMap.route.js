var express = require('express')

var router = express.Router()

// Getting the WareCommMap Controller that we just created

var WareCommMapController = require('../../controllers/wareCommMap.controller');
//console.log("Inside Commodity Pack route:"+PackController);


// Map each API to the Controller FUnctions

router.get('/', WareCommMapController.getWareCommMaps)

router.get('/:id', WareCommMapController.getWareCommMap)

router.post('/', WareCommMapController.createWareCommMap)

router.put('/', WareCommMapController.updateWareCommMap)

router.delete('/:id',WareCommMapController.removeWareCommMap)

// Export the Router

module.exports = router;
