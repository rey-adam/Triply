// REQUIRE THE DATABASE MODELS
const db = require("../../models");

module.exports = {
    
    createTrail: (req, res) => {
        db
            .Trail
            .create({
                LocationId: req.body.locationId,
                name: req.body.trailName,
                hikeId: req.body.trailId
            })
            .then(dbTrail => {
                res.json(dbTrail);
            })
            .catch(err => {
                console.error(err);
                res.json(err);
            });
    }, // END CREATE

    findAllTrail: (req, res) => {
        db
            .Trail
            .findAll({})
            .then(dbTrail => {
                res.json(dbTrail);
            })
            .catch(err => console.error(err));
    }, // END READ

    findOneTrail: (req, res) => {
        db
            .Trail
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(dbTrail => {
                res.json(dbTrail);
            })
            .catch(err => console.error(err));
    }, // END READ ONE

    updateTrail: (req, res) => {
        db.Trail.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
            }).then(dbTrail => {
                res.json(dbTrail);
            })
            .catch(err => console.error(err));
    }, // END UPDATE

    deleteTrail: (req, res) => {
        db
            .Trail
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(dbTrail => {
                res.json("Success!");
            })
            .catch(err => console.error(err));
    } // END DELETE
    
}; // END EXPORT
