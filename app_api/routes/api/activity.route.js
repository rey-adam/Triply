// DEPENDENCIES
const express = require("express"),
    ctrl = require("../../controllers/model/activity.ctrl"),
    router = express.Router();

// CREATE
router.post("/activity", ctrl.createActivity);
// FIND ALL
router.get("/activity", ctrl.findAllActivity);
// FIND ONE @ ID
router.get("/activity/:id", ctrl.findOneActivity);
// DELETE ONE
router.delete("/activity/:id", ctrl.deleteActivity);

module.exports = router;