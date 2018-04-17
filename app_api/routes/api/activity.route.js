// DEPENDENCIES
const express = require("express"),
    ctrl = require("../../controllers/model/activity.ctrl"),
    router = express.Router();

// CREATE
router.post("/activity", ctrl.createActivity);
// READ
router.get("/activity", ctrl.findAllActivity);
// READ ONE @ ID
router.get("/activity/:id", ctrl.findOneActivity);
// UPDATE
router.put("/activity/:id", ctrl.updateActivity);
// DELETE
router.delete("/activity/:id", ctrl.deleteActivity);

module.exports = router;