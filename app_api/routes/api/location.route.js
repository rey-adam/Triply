// DEPENDENCIES
const express = require("express"),
    ctrl = require("../../controllers/model/location.ctrl"),
    router = express.Router();

// CREATE
router.post("/location", ctrl.createLocation);
// READ
router.get("/location", ctrl.findAllLocation);
// READ ONE
router.get("/location/:id", ctrl.findOneLocation);
// UPDATE
router.put("/location/:id", ctrl.updateLocation);
// DELETE 
router.delete("/location/:id", ctrl.deleteLocation);

module.exports = router;