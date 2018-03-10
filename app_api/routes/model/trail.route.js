// DEPENDENCIES
const express = require("express"),
    ctrl = require("../../controllers/model/trail.ctrl"),
    router = express.Router();

// CREATE A TRAIL
router.post("/trail", ctrl.createTrail);
// FIND ALL TRAIL
router.get("/trail", ctrl.findAllTrail);
// FIND ONE TRAIL @ ID
router.get("/trail/:id", ctrl.findOneTrail);
// DELETE ONE TRAIL
router.delete("/trail/:id", ctrl.deleteTrail);

module.exports = router;