// REQUIRE THE DATABASE MODELS
const db = require("../../models");

module.exports = {
    
    createLocation: (req, res) => {
        db
            .Location
            .create({firstName: req.body.firstName, lastName: req.body.lastName, age: req.body.age, jobTitle: req.body.jobTitle})
            .then(dbEmp => {
                res.json(dbEmp);
            })
            .catch(err => {
                console.error(err);
            });
    }, // END CREATE

    findAllLocation: (req, res) => {
        db
            .Location
            .findAll({})
            .then(dbEmp => {
                res.json(dbEmp);
            })
            .catch(err => {
                console.error(err);
                res.json(err);
            });
    }, // END FIND ALL

    findOneLocation: (req, res) => {
        db
            .Location
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(dbEmp => {
                res.json(dbEmp);
            })
            .catch(err => {
                console.error(err);
                res.json(err);
            });
    }, // END FIND ONE

    deleteLocation: (req, res) => {
        db
            .Location
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(dbEmp => {
                res.json("Success!");
            })
            .catch(err => {
                console.error(err);
                res.json(err);
            });
    } // END DELETE
    
}; // END EXPORT
