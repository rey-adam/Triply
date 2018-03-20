// =====================================================================================
// DEPENDENCIES/VARIABLES
// =====================================================================================
const express = require('express')
    , router = express.Router()
    , ctrl = require('../../controllers/api/apiCtrl');

// =====================================================================================
// ROUTES
// =====================================================================================
// must be logged in to view this route
router.get('/parks/:userParkCode', ctrl.getParkData);
router.get('/parks/location/:userPark', ctrl.getLocationData);
router.get('/trails?lat=:lat&lng=:lng', ctrl.getTrailData);

// =====================================================================================
// EXPORT
// =====================================================================================
module.exports = router;