// DEPENDENCIES
const express = require("express"),
    ctrl = require("../../controllers/model/trail.ctrl"),
    router = express.Router();

// CREATE 
router.post("/trail", ctrl.createTrail);
// READ
router.get("/trail", ctrl.findAllTrail);
// READ ONE
router.get("/trail/:id", ctrl.findOneTrail);
// UPDATE
router.put("/trail/:id", ctrl.updateTrail);
// DELETE
router.delete("/trail/:id", ctrl.deleteTrail);

module.exports = router;