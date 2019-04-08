var express = require('express')

var router = express.Router()

// Getting the Pack Controller that we just created

var PackController = require('../../controllers/pack.controller');
//console.log("Inside Pack route:"+PackController);


// Map each API to the Controller FUnctions

router.get('/', PackController.getPacks)

router.get('/:id', PackController.getPack)

router.post('/', PackController.createPack)

router.put('/', PackController.updatePack)

router.delete('/:id',PackController.removePack)

//console.log("Inside Pack route:"+router);
// Export the Router

module.exports = router;
