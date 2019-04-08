var express = require('express')

var router = express.Router()

// Getting the Commodity Pack Controller that we just created

var CommPackController = require('../../controllers/commPack.controller');
//console.log("Inside Commodity Pack route:"+PackController);


// Map each API to the Controller FUnctions

router.get('/', CommPackController.getCommPacks)

router.get('/:id', CommPackController.getCommPack)

router.post('/', CommPackController.createCommPack)

router.put('/', CommPackController.updateCommPack)

router.delete('/:id',CommPackController.removeCommPack)

//console.log("Inside Commodity Pack route:"+router);
// Export the Router

module.exports = router;
