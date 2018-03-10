require("dotenv").config();

/*  
    =====================================================================================
    DEPENDENCIES / VARIABLES
    ===================================================================================== 
*/

const express = require('express')
    , bodyParser = require('body-parser')
    , sequelize = require('sequelize')
    , logger = require('morgan')
    //CONTROLLER
    , authCtrl = require('./app_api/controllers/auth/authCtrl')
    // models
    , models = require('./app_api/models')
    // specify port
    , PORT = process.env.PORT || 3001
    // specify environment
    , isDev = process.env.NODE_ENV === 'development'    
    // ROUTES
    , routes = require('./app_api/routes/indexRoutes')
    // ROUTES FILE
    , tripRoute = require("./app_api/routes/model/trip.route")
    , locationRoute = require("./app_api/routes/model/location.route")
    , trailRoute = require("./app_api/routes/model/trail.route")
    , campsiteRoute = require("./app_api/routes/model/campsite.route")
    , eateryRoute = require("./app_api/routes/model/eatery.route");

/*  
    =====================================================================================
    MIDDLEWARE
    ===================================================================================== 
*/

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(logger('dev'));
app.use(routes);
// app.use(express.static('app_client/build/'));

/*  
    =====================================================================================
    MODEL ROUTES
    ===================================================================================== 
*/

app.use("/api", tripRoute);
app.use("/api", locationRoute);
app.use("/api", trailRoute);
app.use("/api", campsiteRoute);
app.use("/api", eateryRoute);

/*  
    =====================================================================================
    SYNC & START SERVERS
    ===================================================================================== 
*/

// sync sequelize models and start express app
models.sequelize.sync({ force: isDev }).then(function () {

    const salt = authCtrl._generateSalt();

    models.User.bulkCreate([
        {
            email: "josh@spears.com",
            salt: salt,
            hash: authCtrl._generateHash("joshspears", salt)
        },
        {
            email: "jason@daniel.com",
            salt: salt,
            hash: authCtrl._generateHash("jasondaniel", salt)
        },
        {
            email: "melodie@chi.com",
            salt: salt,
            hash: authCtrl._generateHash("melodiechi", salt)
        },
        {
            email: "rey@adam.com",
            salt: salt,
            hash: authCtrl._generateHash("reyadam", salt)
        }
    ]);

    app.listen(PORT, function () {
        console.log("=============================");
        console.log("App listening on PORT " + PORT);
        console.log("=============================");
    });
});
