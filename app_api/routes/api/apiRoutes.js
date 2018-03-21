// =====================================================================================
// DEPENDENCIES/VARIABLES
// =====================================================================================
const express = require('express')
    , router = express.Router()
    , apiCtrl = require('../../controllers/api/apiCtrl')
    , userCtrl = require('../../controllers/api/userCtrl');

// =====================================================================================
// ROUTES (user must be logged in to view these routes)
// =====================================================================================
// API
router.get('/parks/:userParkCode', apiCtrl.getParkData);
router.get('/parks/location/:userPark', apiCtrl.getLocationData);
router.get('/trails?lat=:lat&lng=:lng', apiCtrl.getTrailData);

// USER ACCOUNT
router.get('/users', userCtrl.getAllUsers);
router.get("/user/:id", userCtrl.getUser);
router.get('/user/email/:email', userCtrl.getEmail);
router.put('/user/:id', userCtrl.updateUser);
router.put('/user/pass/:id', userCtrl.updateUserPass);
router.delete('/user/:id', userCtrl.deleteUser);

// =====================================================================================
// EXPORT
// =====================================================================================
module.exports = router;