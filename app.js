
require("dotenv").config();

/*  
    =====================================================================================
    DEPENDENCIES / VARIABLES
    ===================================================================================== 
*/

// =====================================================================================
// DEPENDENCIES / VARIABLES
// =====================================================================================
const express = require('express')
    , bodyParser = require('body-parser')
    , sequelize = require('sequelize')
    , logger = require('morgan')
    
    // CONTROLLERS
    , authCtrl = require('./app_api/controllers/auth/authCtrl')
    , apiCtrl = require('./app_api/controllers/api/apiCtrl')

    // MODELS
    , models = require('./app_api/models')

    // PORT
    , PORT = process.env.PORT || 3001
    // ENVIRONMENT
    // , isDev = process.env.NODE_ENV === 'development'    
    // ROUTES
    , routes = require('./app_api/routes/indexRoutes')
    // ROUTES FILE
    , activityRoute = require("./app_api/routes/model/activity.route") 
    , campsiteRoute = require("./app_api/routes/model/campsite.route")       
    , eateryRoute = require("./app_api/routes/model/eatery.route")  
    , locationRoute = require("./app_api/routes/model/location.route")  
    , trailRoute = require("./app_api/routes/model/trail.route")        
    , tripRoute = require("./app_api/routes/model/trip.route")

    // specify environment
    , isDev = process.env.NODE_ENV === 'development';
    if (isDev){
        app.use(express.static('app_client/public'));
    }

// =====================================================================================
// MIDDLEWARE
// =====================================================================================
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(logger('dev'));
app.use(routes);
app.use(express.static('app_client/build/'));

/*  
    =====================================================================================
    MODEL ROUTES
    ===================================================================================== 
*/

app.use("/api", activityRoute);
app.use("/api", campsiteRoute);
app.use("/api", eateryRoute);
app.use("/api", locationRoute);
app.use("/api", trailRoute);
app.use("/api", tripRoute);

/*  
    =====================================================================================
    SYNC & START SERVERS
    ===================================================================================== 
*/

// SYNC SEQUELIZE MODELS AND START EXPRESS APP
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
            hash: authCtrl._generateHash("reyadamcruz", salt)
        }
    ]);
    app.listen(PORT, function() {
        console.log("=============================");
        console.log("App listening on PORT " + PORT);
        console.log("=============================");
    }); // END LISTEN
}); // END SYNC 