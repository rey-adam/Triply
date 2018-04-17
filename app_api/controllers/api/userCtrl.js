// =====================================================================================
// DEPENDENCIES + GLOBAL VARIABLES
// =====================================================================================
var models = require('../../models');
var authCtrl = require('../auth/authCtrl');

// =====================================================================================
// GLOBAL FUNCTIONS
// =====================================================================================
class UserCtrl {
    static getAllUsers(req, res) {
        console.log('GETTING ALL USERS');
        models.User.findAll({})
            .then(response => {
                res.json(response);
            })
            .catch(err => {
                console.error(err);
                res.status(400).end();
            });
    }

    static getUser(req, res) {
        console.log("GETTING USER");
        console.log("WTF")
        models
            .User
            .findOne({
                where: {
                    id: req.params.id
                },
                include: [{
                    model: models.Trip, include: [{
                        model: models.Location, include: [{ all: true }]
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
    }

    static getEmail(req, res) {
        console.log('CHECKING FOR EMAIL');
        models.User.findOne({
            where: {
                email: req.params.email
            }
        })
        .then(dbUser => {
            if (dbUser === null) {
                console.log("=============================");
                console.log(`Email ${req.params.email} is available`);
                console.log("=============================");

                res.json({
                    success: true,
                    msg: `Email ${req.params.email} is available`
                });
            } else {
                console.log("=============================");
                console.log(`USER ALREADY EXISTS: ${dbUser.dataValues.email}`);
                console.log("=============================");
                res.statusMessage = 'USER ALREADY EXISTS';
                res.status(404).end();
            }
        })
        .catch(err => {
            console.error(err);
        });
    }

    static updateUser(req, res) {
        console.log('UPDATING USER');
        models.User.update({
            email: req.body.email,
        }, {
                where: {
                    id: req.params.id
                }
            })
            .then(updateResponse => {
                return models.User.findOne({
                    where: {
                        id: req.params.id
                    }
                });
            })
            .then(updatedUserResponse => {
                const updatedUser = {
                    id: updatedUserResponse.id,
                    email: updatedUserResponse.email
                };
                console.log('====== USER UPDATED ======');
                console.log(`id: ${updatedUser.id}`);
                console.log(`email: ${updatedUser.email}`);
                console.log('==========================');
                res.json(updatedUser);
            })
            .catch(err => {
                console.error(err);
                res.status(400).end();
            });
    }

    static updateUserPass(req, res) {
        console.log('UPDATING USER PASS');

        var salt = authCtrl._generateSalt();
        var hash = authCtrl._generateHash(req.body.password, salt);

        models.User.update({
            salt: salt,
            hash: hash
        }, {
                where: {
                    id: req.params.id
                }
            })
            .then(updateResponse => {
                return models.User.findOne({
                    where: {
                        id: req.params.id
                    }
                });
            })
            .then(updatedUserResponse => {
                const updatedUser = {
                    id: updatedUserResponse.id,
                    email: updatedUserResponse.email
                };
                console.log('====== USER UPDATED ======');
                console.log(`id: ${updatedUser.id}`);
                console.log(`email: ${updatedUser.email}`);
                console.log('==========================');
                res.json(updatedUser);
            })
            .catch(err => {
                console.error(err);
                res.status(400).end();
            });
    }

    static deleteUser(req, res) {
        console.log('DELETING USER');
        models.User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function(deleteResponse) {
            console.log(deleteResponse);
            console.log('====== USER DELETED ======');
            res.json(deleteResponse);
        })
        .catch(function(err) {
            console.error(err);
        });
    }
};

// =====================================================================================
// EXPORT
// =====================================================================================
module.exports = UserCtrl;