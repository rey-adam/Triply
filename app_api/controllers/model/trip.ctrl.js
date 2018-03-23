// REQUIRE THE DATABASE MODELS
const sequelize = require('sequelize');
const db = require("../../models");
const locationCtrl = require('./location.ctrl');

module.exports = {
    
    createTrip: (req, res) => {
        db
            .Trip
            .create({
                UserId: req.body.userId,
                name: req.body.tripName,
                start: req.body.startDate,
                end: req.body.endDate
             })
            .then(dbTrip => {
                res.json(dbTrip);
            })
            .catch(err => {
                console.error(err);
                res.json(err);
            });
    }, // END CREATE

    findAllTrip: (req, res) => {
        db
            .Trip
            .findAll({})
            .then(dbTrip => {
                res.json(dbTrip);
            })
            .catch(err => console.error(err));
    }, // END FIND ALL

    findAllUserTrips: (req, res) => {
        db
            .Trip
            .findAll({
                where: {
                    UserId: req.params.id
                },
                attributes: [
                    'UserId',
                    'id',
                    'name',
                    [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('start'), '%b %d %Y'), 'startDate'],
                    [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('end'), '%b %d %Y'), 'endDate']
                ]
            })
            .then(dbTrips => {
                res.json(dbTrips);
            })
            .catch(err => {
                console.error(err);
                res.json(err);
            });
    }, // END FIND ALL USER TRIPS

    findOneTrip: (req, res) => {
        db
            .Trip
            .findOne({
                where: {
                    UserId: req.params.id
                }
            })
            .then(dbTrip => {
                res.json(dbTrip);
            })
            .catch(err => console.error(err));
    }, // END FIND ONE

    updateTrip: (req, res) => {
        db.Trip.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
            }).then(dbTrip => {
                res.json(dbTrip);
            })
            .catch(err => console.error(err));
    }, // END UPDATE

    deleteTrip: (req, res) => {
        db
            .Trip
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(dbTrip => {
                res.json("Success!");
            })
            .catch(err => console.error(err));
    } // END DELETE
    
}; // END EXPORT
