// DEPENDENCIES
const express = require("express"),
    ctrl = require("../../controllers/model/user.ctrl"),
    router = express.Router();

// CREATE ONE
router.post("/user", ctrl.createUser);
// FIND ALL 
router.get("/user", ctrl.findAllUser);
// FIND ONE @ ID
router.get("/user/:id", ctrl.findOneUser);
// DELETE ONE 
router.delete("/user/:id", ctrl.deleteUser);

module.exports = router;