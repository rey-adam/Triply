// DEPENDENCIES
const express = require("express"),
    ctrl = require("../../controllers/model/visitorCenter.ctrl"),
    router = express.Router();

    
// CREATE
router.post("/center", ctrl.createVisitorCenter);
// READ
router.get("/center", ctrl.findAllVisitorCenter);
// READ ONE
router.get("/center/:id", ctrl.findOneVisitorCenter);
// UPDATE
router.put("/center/:id", ctrl.updateVisitorCenter);
// DELETE
router.delete("/center/:id", ctrl.deleteVisitorCenter);

module.exports = router;