var express = require('express')

var router = express.Router()

// Getting the Commodity Controller that we just created

var OrganizationController = require('../../controllers/organization.controller');
//console.log("Inside Commodities route:"+CommodityController);


// Map each API to the Controller FUnctions

router.get('/', OrganizationController.getOrganizations)

router.get('/:id', OrganizationController.getOrganization)

router.post('/', OrganizationController.createOrganization)

router.put('/', OrganizationController.updateOrg)

router.delete('/:id',OrganizationController.removeOrg)

//console.log("Inside Commodities route:"+router);
// Export the Router

module.exports = router;
