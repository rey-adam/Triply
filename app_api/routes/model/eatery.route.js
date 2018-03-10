// DEPENDENCIES
const express = require("express"),
    ctrl = require("../../controllers/model/eatery.ctrl"),
    router = express.Router();

// CREATE A EATERY
router.post("/eatery", ctrl.createEatery);
// FIND ALL EATERY
router.get("/eatery", ctrl.findAllEatery);
// FIND ONE EATERY @ ID
router.get("/eatery/:id", ctrl.findOneEatery);
// DELETE ONE EATERY
router.delete("/eatery/:id", ctrl.deleteEatery);

module.exports = router;