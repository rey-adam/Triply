// DEPENDENCIES
// =====================================================================================
const models = require('../../models')
    , crypto = require('crypto')
    , jwt = require('jsonwebtoken');

// GLOBAL VARIABLES
// =====================================================================================
const ctrl = {};

// GLOBAL FUNCTIONS
// =====================================================================================
// these hashing functions are helper functions
ctrl.getSalt = () => {
    return crypto.randomBytes(16).toString('hex');
};

ctrl.getHash = (password, salt) => {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
};

ctrl.generateJWT = (user) => {
    // const expire = new Date();
    // expire.setDate(expire.getDate() + 1);
    return jwt.sign({
        id: user.id,
        first: user.first_name,
        last: user.last_name,
        email: user.email,
        phone: user.phone,
        // exp: expire.getTime() / 1000
        // exp: Math.floor(Date.now() / 1000) + (60 * 60), // expires in 1 hour
    }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// ROUTES
// =====================================================================================
ctrl.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    models.UserInfo.findOne({
        where: {
            email: email
        }
    })
        .then(response => {
            // console.log(response);
            if (response) {
                // login
                const inputHash = ctrl.getHash(password, response.salt);
                if (inputHash === response.hash) {
                    console.log("USER FOUND");
                    res.json({
                        token: ctrl.generateJWT(response)
                    });
                } else {
                    console.log("WRONG PASSWORD");
                    return res.status(400).end('Wrong Password');
                }
            } else {
                // err
                // throw new Error('User Not Found');
                console.log("USER NOT FOUND");
                return res.status(404).end('User Not Found');
                // can also create helper functions that help you send errors
            }
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
};

ctrl.register = (req, res) => {
    // set up user: expect a first/last name, email, password in the req
    const user = {
        first_name: req.body.firstName.trim(),
        last_name: req.body.lastName.trim(),
        email: req.body.email.trim().toLowerCase(),
        phone: req.body.phone.trim().replace(/[-()]+/g, '')
    };

    const salt = ctrl.getSalt();
    const hash = ctrl.getHash(req.body.password, salt);
    user.salt = salt;
    user.hash = hash;

    models.UserInfo.findOne({
        where: {
            email: user.email
        }
    })
        .then(response => {
            // console.log(response);
            if (response === null) {
                models.UserInfo.create(user)
                    .then(response => {
                        // console.log(response);
                        console.log("REGISTRATION SUCCESSFUL");
                        res.json({
                            success: true
                        }); // don't want to do res.json(response) here because you don't want to include the salt and hash in the response to the user!!
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
};

// EXPORT
// =====================================================================================
module.exports = ctrl;