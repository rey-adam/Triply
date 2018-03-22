// REQUIRE THE DATABASE MODELS
const db = require("../../models");

module.exports = {
    
    createUser: (req, res) => {
        db
            .User
            .create(req.body)
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => {
                console.error(err);
            });
    }, // END CREATE

    findAllUser: (req, res) => {
        db
            .User
            .findAll({})
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => {
                console.error(err);
                res.json(err);
            });
    }, // END FIND ALL

    findOneUser: (req, res) => {
        db
            .User
            .findOne({
                where: {
                    id: req.params.id
                },
                include: [{
                    model: db.Trip, include: [{
                        model: db.Location, include: [{all:true}]
                    }]
                }]
            })
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => {
                console.error(err);
                res.json(err);
            });
    }, // END FIND ONE

    deleteUser: (req, res) => {
        db
            .User
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(dbUser => {
                res.json("Success!");
            })
            .catch(err => {
                console.error(err);
                res.json(err);
            });
    } // END DELETE
    
}; // END EXPORT
