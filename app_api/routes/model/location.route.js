// DEPENDENCIES
const express = require("express"),
    ctrl = require("../../controllers/model/location.ctrl"),
    router = express.Router();

// CREATE AN LOCATION
router.post("/location", ctrl.createLocation);
// FIND ALL LOCATION
router.get("/location", ctrl.findAllLocation);
// FIND ONE LOCATION @ ID
router.get("/location/:id", ctrl.findOneLocation);
// DELETE ONE LOCATION
router.delete("/location/:id", ctrl.deleteLocation);

module.exports = router;