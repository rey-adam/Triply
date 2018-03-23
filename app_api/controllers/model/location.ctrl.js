// REQUIRE THE DATABASE MODELS
const db = require("../../models");

module.exports = {
    
    createLocation: (req, res) => {
        db
            .Location
            .create({
                TripId: req.body.tripId,
                name: req.body.parkName,
                parkCode: req.body.parkCode,
                latitude: req.body.latitude,
                longitude: req.body.longitude
            })
            .then(dbLocation => {
                res.json(dbLocation);
            })
            .catch(err => console.error(err));
    }, // END CREATE

    findAllLocation: (req, res) => {
        db
            .Location
            .findAll({})
            .then(dbLocation => {
                res.json(dbLocation);
            })
            .catch(err => console.error(err));
    }, // END READ

    findOneLocation: (req, res) => {
        db
            .Location
            .findOne({
                where: {
                    TripId: req.params.id
                }
            })
            .then(dbLocation => {
                res.json(dbLocation);
            })
            .catch(err => console.error(err));
    }, // END READ ONE

    updateLocation: (req, res) => {
        db.Location.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
            }).then(dbLocation => {
                res.json(dbLocation);
            })
            .catch(err => console.error(err));
    }, // END UPDATE

    deleteLocation: (req, res) => {
        db
            .Location
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(dbLocation => {
                res.json("Success!");
            })
            .catch(err => console.error(err));
    } // END DELETE
    
}; // END EXPORT
