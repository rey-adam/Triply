// =====================================================================================
// DEPENDENCIES
// =====================================================================================
const models = require('../../models')
    , crypto = require('crypto')
    , jwt = require('jsonwebtoken')
    , db = require("../../models");


// =====================================================================================
// AUTH CONTROLLER CONSTRUCTOR
// =====================================================================================
class AuthCtrl {

    // =====================================================================================
    // LOGIN FUNCTION
    // =====================================================================================
    static login(req, res) {
        // check if hashes match
        models.User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(dbUser => {
                if (dbUser) {
                    console.log("=============================");
                    console.log(`USER FOUND: ${dbUser.dataValues.email}`);
                    console.log("=============================");

                    // need to generate a hash to check if hashes match
                    const validationHash = AuthCtrl._generateHash(req.body.password, dbUser.salt);

                    // if login success/user found
                    if (validationHash === dbUser.hash) {
                        // return JWT
                        const token = AuthCtrl._generateJWT(dbUser);
                        res.json({
                            msg: 'Pass match',
                            token: token
                        });
                    } else {
                        console.log("=============================");
                        console.log("INCORRECT PASSWORD");
                        console.log("=============================");
                        // 400 = not found, authentication error
                        res.statusMessage = 'INCORRECT PASSWORD';
                        res.status(400).end();
                    }
                } else {
                    console.log("=============================");
                    console.log("USER NOT FOUND");
                    console.log("=============================");
                    res.statusMessage = 'USER NOT FOUND';
                    res.status(404).end();
                }

            })
            .catch(err => {
                console.error(err);
                res.statusMessage = `USER ${req.body.email} NOT FOUND`;
                res.status(400).end();
            });
    }; // ENN LOGIN

    // =====================================================================================
    // REGISTER FUNCTION
    // =====================================================================================
    static register(req, res) {
        // create salt
        const salt = AuthCtrl._generateSalt();

        // create hash
        const hash = AuthCtrl._generateHash(req.body.password, salt);

        // create user object
        const user = {
            email: req.body.email,
            salt: salt,
            hash: hash
        };

        models.User.findOne({
            where: {
                email: user.email
            }
        })
            .then(dbUser => {
                if (dbUser === null) {
                    models.User.create(user)
                        .then(newDbUser => {
                            console.log("=============================");
                            console.log(`REGISTRATION SUCCESS: ${newDbUser.email}`);
                            console.log("=============================");

                            // don't want to do res.json(response) here because you don't want to include the salt and hash in the response to the user!!
                            res.json({
                                success: true,
                                msg: `User ${user.email} created!`
                            });
                        })
                        .catch(err => {
                            console.error(err);
                            throw err;
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

    // =====================================================================================
    // HASH, SALT & JWT ("PRIVATE" FUNCTIONS)
    // =====================================================================================
    // generate hash from user password
    static _generateHash(password, salt) {
        return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    }

    // generate salt to increase hash complexity
    static _generateSalt() {
        return crypto.randomBytes(16).toString('hex');
    }

    // generate JSON web token for route authentication
    static _generateJWT(user) {
        return jwt.sign({
            id: user.id,
            email: user.email,
        }, process.env.JWT_SECRET, { expiresIn: '7h' });
    }
};

// =====================================================================================
// EXPORT
// =====================================================================================
module.exports = AuthCtrl;