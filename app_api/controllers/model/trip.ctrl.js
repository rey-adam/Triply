// REQUIRE THE DATABASE MODELS
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
            .findAll({
                attributes: [
                    'UserId',
                    'id',
                    'name',
                    [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('start'), '%b %d %Y'), 'startDate'],
                    [sequelize.Sequelize.fn('date_format', sequelize.Sequelize.col('end'), '%b %d %Y'), 'endDate']
                ]
            })
            .then(dbTrip => {
                res.json(dbTrip);
            })
            .catch(err => {
                console.error(err);
                res.json(err);
            });
    }, // END FIND ALL

    findOneTrip: (req, res) => {
        db
            .Trip
            .findOne({
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
            .then(dbTrip => {
                res.json(dbTrip);
            })
            .catch(err => {
                console.error(err);
                res.json(err);
            });
    }, // END FIND ONE

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
            .catch(err => {
                console.error(err);
                res.json(err);
            });
    } // END DELETE
    
}; // END EXPORT
