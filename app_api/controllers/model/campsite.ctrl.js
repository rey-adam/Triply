// REQUIRE THE DATABASE MODELS
const db = require("../../models");

module.exports = {
    
    createCampsite: (req, res) => {
        db
            .Campsite
            .create(req.body)
            .then(dbCampsite => {
                res.json(dbCampsite);
            })
            .catch(err => {
                console.error(err);
            });
    }, // END CREATE

    findAllCampsite: (req, res) => {
        db
            .Campsite
            .findAll({})
            .then(dbCampsite => {
                res.json(dbCampsite);
            })
            .catch(err => {
                console.error(err);
                res.json(err);
            });
    }, // END FIND ALL

    findOneCampsite: (req, res) => {
        db
            .Campsite
            .findOne({
                where: {
                    LocationId: req.params.id
                }
            })
            .then(dbCampsite => {
                res.json(dbCampsite);
            })
            .catch(err => {
                console.error(err);
                res.json(err);
            });
    }, // END FIND ONE

    deleteCampsite: (req, res) => {
        db
            .Campsite
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(dbCampsite => {
                res.json("Success!");
            })
            .catch(err => {
                console.error(err);
                res.json(err);
            });
    } // END DELETE
    
}; // END EXPORT
