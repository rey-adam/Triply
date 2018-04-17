// DEPENDENCIES
const express = require("express"),
    ctrl = require("../../controllers/model/campsite.ctrl"),
    router = express.Router();

// CREATE
router.post("/campsite", ctrl.createCampsite);
// READ
router.get("/campsite", ctrl.findAllCampsite);
// READ ONE
router.get("/campsite/:id", ctrl.findOneCampsite);
// UPDATE
router.put("/campsite/:id", ctrl.updateCampsite);
// DELETE
router.delete("/campsite/:id", ctrl.deleteCampsite);

module.exports = router;