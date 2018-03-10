// DEPENDENCIES
const express = require("express"),
    ctrl = require("../../controllers/model/campsite.ctrl"),
    router = express.Router();

// CREATE A CAMPSITE
router.post("/campsite", ctrl.createCampsite);
// FIND ALL CAMPSITE
router.get("/campsite", ctrl.findAllCampsite);
// FIND ONE CAMPSITE @ ID
router.get("/campsite/:id", ctrl.findOneCampsite);
// DELETE ONE CAMPSITE
router.delete("/campsite/:id", ctrl.deleteCampsite);

module.exports = router;