// REQUIRE THE DATABASE MODELS
const db = require("../../models");

module.exports = {
    
    createVisitorCenter: (req, res) => {
        db
            .VisitorCenter
            .create(req.body)
            .then(dbVisitorCenter => {
                res.json(dbVisitorCenter);
            })
            .catch(err => console.error(err));
    }, // END CREATE

    findAllVisitorCenter: (req, res) => {
        db
            .VisitorCenter
            .findAll({})
            .then(dbVisitorCenter => {
                res.json(dbVisitorCenter);
            })
            .catch(err => console.error(err));
    }, // END READ

    findOneVisitorCenter: (req, res) => {
        db
            .VisitorCenter
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(dbVisitorCenter => {
                res.json(dbVisitorCenter);
            })
            .catch(err => console.error(err));
    }, // END READ ONE

    updateVisitorCenter: (req, res) => {
        db.VisitorCenter.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
            }).then(dbVisitorCenter => {
                res.json(dbVisitorCenter);
            })
            .catch(err => console.error(err));
    }, // END UPDATE

    deleteVisitorCenter: (req, res) => {
        db
            .VisitorCenter
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(dbVisitorCenter => {
                res.json("Success!");
            })
            .catch(err => console.error(err));
    } // END DELETE
    
}; // END EXPORT
