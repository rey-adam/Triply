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
        models.User.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(userResponse => {
                const user = {
                    id: userResponse.id,
                    email: userResponse.email
                };
                console.log('====== USER UPDATED ======');
                console.log(`id: ${user.id}`);
                console.log(`email: ${user.email}`);
                console.log('==========================');
                res.json(user);
            })
            .catch(err => {
                console.error(err);
                res.status(400).end();
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
            .then(function(response) {
                console.log(response);
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