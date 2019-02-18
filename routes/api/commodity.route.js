var express = require('express')

var router = express.Router()

// Getting the Commodity Controller that we just created

var CommodityController = require('../../controllers/commodity.controller');
//console.log("Inside Commodities route:"+CommodityController);


// Map each API to the Controller FUnctions

router.get('/', CommodityController.getCommodities)

router.post('/', CommodityController.createCommodity)

router.put('/', CommodityController.updateCommodity)

router.delete('/:id',CommodityController.removeCommodity)

//console.log("Inside Commodities route:"+router);
// Export the Router

module.exports = router;
