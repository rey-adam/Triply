// DEPENDENCIES
const express = require("express"),
    ctrl = require("../../controllers/model/user.ctrl"),
    router = express.Router();

// CREATE 
router.post("/user", ctrl.createUser);
// READ 
router.get("/user", ctrl.findAllUser);
// READ ONE 
router.get("/user/:id", ctrl.findOneUser);
// UPDATE
router.put("/user/:id", ctrl.updateUser);
// DELETE
router.delete("/user/:id", ctrl.deleteUser);

module.exports = router;