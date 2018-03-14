// REQUIRE THE DATABASE MODELS
const db = require("../../models");

module.exports = {
    
    createEatery: (req, res) => {
        db
            .Eatery
            .create(req.body)
            .then(dbEatery => {
                res.json(dbEatery);
            })
            .catch(err => {
                console.error(err);
            });
    }, // END CREATE

    findAllEatery: (req, res) => {
        db
            .Eatery
            .findAll({})
            .then(dbEatery => {
                res.json(dbEatery);
            })
            .catch(err => {
                console.error(err);
                res.json(err);
            });
    }, // END FIND ALL

    findOneEatery: (req, res) => {
        db
            .Eatery
            .findOne({
                where: {
                    LocationId: req.params.id
                }
            })
            .then(dbEatery => {
                res.json(dbEatery);
            })
            .catch(err => {
                console.error(err);
                res.json(err);
            });
    }, // END FIND ONE

    deleteEatery: (req, res) => {
        db
            .Eatery
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(dbEatery => {
                res.json("Success!");
            })
            .catch(err => {
                console.error(err);
                res.json(err);
            });
    } // END DELETE
    
}; // END EXPORT
