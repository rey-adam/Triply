// DEPENDENCIES
const express = require("express"),
    ctrl = require("../../controllers/model/visitorCenter.ctrl"),
    router = express.Router();

    
// CREATE A CENTER
router.post("/center", ctrl.createVisitorCenter);
// FIND ALL CENTER
router.get("/center", ctrl.findAllVisitorCenter);
// FIND ONE CENTER @ ID
router.get("/center/:id", ctrl.findOneVisitorCenter);
// DELETE ONE CENTER
router.delete("/center/:id", ctrl.deleteVisitorCenter);

module.exports = router;