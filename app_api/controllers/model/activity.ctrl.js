// REQUIRE THE DATABASE MODELS
const db = require("../../models");

module.exports = {

    createActivity: (req, res) => {
        db
            .Activity
            .create(req.body)
            .then(dbActivity => {
                res.json(dbActivity);
            })
            .catch(err => console.error(err));
    }, // END CREATE

    findAllActivity: (req, res) => {
        db
            .Activity
            .findAll({})
            .then(dbActivity => {
                res.json(dbActivity);
            })
            .catch(err => console.error(err));
    }, // END READ

    findOneActivity: (req, res) => {
        db
            .Activity
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(dbActivity => {
                res.json(dbActivity);
            })
            .catch(err => console.error(err));
    }, // END READ ONE

    updateActivity: (req, res) => {
        db.Activity.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
            }).then(dbActivity => {
                res.json(dbActivity);
            })
            .catch(err => console.error(err));
    }, // END UPDATE

    deleteActivity: (req, res) => {
        db
            .Activity
            .destroy({
                where: {
                    LocationId: req.params.id
                }
            })
            .then(dbActivity => {
                res.json("Success!");
            })
            .catch(err => console.error(err));
    } // END DELETE

}; // END CRUD
