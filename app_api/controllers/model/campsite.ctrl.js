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
            .catch(err => console.error(err));
    }, // END CREATE

    findAllCampsite: (req, res) => {
        db
            .Campsite
            .findAll({})
            .then(dbCampsite => {
                res.json(dbCampsite);
            })
            .catch(err => console.error(err));
    }, // END READ

    findOneCampsite: (req, res) => {
        db
            .Campsite
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(dbCampsite => {
                res.json(dbCampsite);
            })
            .catch(err => console.error(err));
    }, // END READ ONE

    updateCampsite: (req, res) => {
        db.Campsite.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
            }).then(dbCampsite => {
                res.json(dbCampsite);
            })
            .catch(err => console.error(err));
    }, // END UPDATE 

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
            .catch(err => console.error(err));
    } // END DELETE
    
}; // END EXPORT
