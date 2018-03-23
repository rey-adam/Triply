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
            .catch(err => console.error(err));
    }, // END CREATE

    findAllUser: (req, res) => {
        db
            .User
            .findAll({})
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => console.error(err));
    }, // END READ

    findOneUser: (req, res) => {
        console.log("WTF")
        db
            .User
            .findOne({
                where: {
                    id: req.params.id
                },
                include: [{
                    model: db.Trip, include: [{
                        model: db.Location, include: [{ all: true }]
                    }]
                }]
            })
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => console.error(err));
    }, // END READ ONE

    updateUser: (req, res) => {
        db.User.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
            }).then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => console.error(err));
    }, // END UPDATE

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
            .catch(err => console.error(err));
    } // END DELETE

}; // END EXPORT
