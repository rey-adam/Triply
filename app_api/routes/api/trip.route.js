// DEPENDENCIES
const express = require("express"),
    ctrl = require("../../controllers/model/trip.ctrl"),
    router = express.Router();

// CREATE
router.post("/trip", ctrl.createTrip);
// READ
router.get("/trip", ctrl.findAllTrip);
// READ ONE
router.get("/trip/:id", ctrl.findOneTrip);
// UPDATE
router.put("/trip/:id", ctrl.updateTrip);
// DELETE
router.delete("/trip/:id", ctrl.deleteTrip);

module.exports = router;