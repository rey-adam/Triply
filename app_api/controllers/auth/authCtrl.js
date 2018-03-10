// =====================================================================================
// DEPENDENCIES
// =====================================================================================
const models = require('../../models')
    , crypto = require('crypto')
    , jwt = require('jsonwebtoken');

// =====================================================================================
// AUTH CONTROLLER CONSTRUCTOR
// =====================================================================================
class AuthCtrl {

    // =====================================================================================
    // LOGIN FUNCTION
    // =====================================================================================
    static login(req, res) {
        // check if hashes match
        models.User.findOne({ email: req.body.email })
        .then(dbUser => {
            if (dbUser) {
                console.log(dbUser);

                // need to generate a hash to check if hashes match
                const validationHash = AuthCtrl._generateHash(req.body.password, dbUser.salt);
                
                // if login success/user found
                if (validationHash === dbUser.hash) {
                    // return JWT
                    const token = AuthCtrl._generateJWT(dbUser);
                    res.json('User found', { token: token });
                } else {
                    // 400 = not found, authentication error
                    res.status(400).json('Incorrect password');
                }
            } else {
                console.log("USER NOT FOUND");
                return res.status(404).end('User not found');
            }
            
        })
        .catch(err => {
            console.error(err);
            res.status(400).json(`User ${req.body.email} not found`);
        });
    }

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
            // console.log(response);
            if (dbUser === null) {
                models.User.create(user)
                    .then(newDbUser => {
                        console.log(newDbUser);
                        console.log("REGISTRATION SUCCESS");

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
                console.log("USER ALREADY EXISTS");
                return res.status(404).end('User Already Exists');
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
        return crypto.pbkdf2Sync(password, salt, 100000, 512, 'sha512').toString('hex');
    }

    // generate salt to increase hash complexity
    static _generateSalt() {
        return crypto.randomBytes(16).toString('hex');
    }

    // generate JSON web token for route authentication
    static _generateJWT(user) {
        return jwt.sign({
            userID: user._id,
            email: user.email,
        }, process.env.JWT_SECRET, { expiresIn: '7h' });
    }
};

// =====================================================================================
// EXPORT
// =====================================================================================
module.exports = AuthCtrl;