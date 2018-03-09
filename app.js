require('dotenv').config();

// DEPENDENCIES
// =====================================================================================
const express = require('express')
    , bodyParser = require('body-parser')
    , sequelize = require('sequelize')
    , path = require('path')
    , morgan = require('morgan')
    , expjwt = require('express-jwt')
    , jwt = require('jsonwebtoken')
    , cookieParser = require('cookie-parser')

    // controllers
    , authCtrl = require('./app_api/controllers/auth/auth_controller')
    , apiCtrl = require('./app_api/controllers/api/api_controller')

    // models
    , models = require('./app_api/models')

    // specify port
    , PORT = process.env.PORT || 8080
    , isDev = process.env.NODE_ENV === 'development';

// MIDDLEWARE
// =====================================================================================
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(morgan('dev'));

// // set satic directory
// app.use(express.static(path.join(__dirname, '/app_client/public/assets/img')));

// // routes
// const hbsRoutes = require('./routes/hbs-routes')
//     , hbsAuthRoutes = require('./routes/hbs-auth-routes')
//     , authRoutes = require('./routes/auth-routes')
//     , apiRoutes = require('./routes/api-routes');

// // routes that don't require user to be logged in
// app.use('/', hbsAuthRoutes);
// app.use('/auth', authRoutes);

const auth = function(req, res, next) {
    try {
        console.log("COOKIE AUTH", req.get("Authorization"));
        const token = req.cookies.token || req.get("Authorization").split(" ")[1];
        console.log(token);
        try {
            console.log("we trying");
            jwt.verify(token, process.env.JWT_SECRET);
            next();
        } catch (err) {
            console.log("we failin", err);
            throw new Error("Not Authenticated");
            res.render("error");
        }
    } catch (err) {
        console.log("something is really wrong", err);
        throw new Error("Not Authenticated");
        res.render("error");
    }
}
app.use(auth);

// // routes that require user to be logged in
// app.use('/api', apiRoutes);
// app.use('/', hbsRoutes);

// SYNC & START SERVERS
// =====================================================================================
// sync sequelize models and start express app
models.sequelize.sync({ force: isDev }).then(function() {
    const salt = authCtrl.getSalt();
    models.User.bulkCreate([
        {
            email: "josh@spears.com",
            salt: salt,
            hash: authCtrl.getHash("joshspears", salt)
        },
        {
            email: "jason@daniel.com",
            salt: salt,
            hash: authCtrl.getHash("jasondaniel", salt)
        },
        {
            email: "melodie@chi.com",
            salt: salt,
            hash: authCtrl.getHash("melodiechi", salt)
        },
        {
            email: "rey@adam.com",
            salt: salt,
            hash: authCtrl.getHash("reyadam", salt)
        }
    ]);
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});