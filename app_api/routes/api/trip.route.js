// DEPENDENCIES
const express = require("express"),
    ctrl = require("../../controllers/model/trip.ctrl"),
    router = express.Router();

// CREATE A TRIP
router.post("/trip", ctrl.createTrip);
// FIND ALL TRIP
router.get("/trip", ctrl.findAllTrip);
// FIND ALL USER TRIPS
router.get("/trips/:id", ctrl.findAllUserTrips);
// FIND ONE TRIP @ ID
router.get("/trip/:id", ctrl.findOneTrip);
// DELETE ONE TRIP
router.delete("/trip/:id", ctrl.deleteTrip);

module.exports = router;