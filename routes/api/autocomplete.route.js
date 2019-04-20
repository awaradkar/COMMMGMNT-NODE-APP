var express = require('express')

var router = express.Router()

// Getting the AutoComplete Controller that we just created

var AutoCompleteController = require('../../controllers/autocomplete.controller');
//console.log("Inside AutoComplete route:"+AutoCompleteController);


// Map each API to the Controller FUnctions

router.get('/commName', AutoCompleteController.getCommAutoComplete)
router.get('/orgName', AutoCompleteController.getOrgNameAutoComplete)
router.get('/orgCity', AutoCompleteController.getOrgCityAutoComplete)

module.exports = router;
