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
            .catch(err => {
                console.error(err);
            });
    }, // END CREATE

    findAllVisitorCenter: (req, res) => {
        db
            .VisitorCenter
            .findAll({})
            .then(dbVisitorCenter => {
                res.json(dbVisitorCenter);
            })
            .catch(err => {
                console.error(err);
                res.json(err);
            });
    }, // END FIND ALL

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
            .catch(err => {
                console.error(err);
                res.json(err);
            });
    }, // END FIND ONE

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
            .catch(err => {
                console.error(err);
                res.json(err);
            });
    } // END DELETE
    
}; // END EXPORT
