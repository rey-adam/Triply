
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

    // CONTROLLERS
    , authCtrl = require('./app_api/controllers/auth/authCtrl')
    // DB
    , models = require('./app_api/models')

    , PORT = process.env.PORT || 3001
    // ENVIRONMENT
    , isDev = process.env.NODE_ENV === 'development'
    // ROUTES
    , routes = require('./app_api/routes/indexRoutes')

    , app = express()

    , tripData = require("./app_api/data/trip")
    , locationData = require("./app_api/data/location")
    , trailData = require("./app_api/data/trail")
    , campData = require("./app_api/data/campsite")
    , activityData = require("./app_api/data/activity")
    , centerData = require("./app_api/data/visitorCenter");

/*  
    =====================================================================================
    MIDDLEWARE
    ===================================================================================== 
*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(logger('dev'));
app.use(routes);
if (isDev) {
    app.use(express.static('app_client/public'));
}
app.use(express.static('app_client/build'));

/*  
    =====================================================================================
    SYNC & START SERVERS
    ===================================================================================== 
*/

models.sequelize.sync({ force: isDev }).then(function () {

    const saltArr = [authCtrl._generateSalt(), authCtrl._generateSalt(), authCtrl._generateSalt(), authCtrl._generateSalt()];
    if (isDev) {


        models.User.bulkCreate([
            {
                email: "josh@spears.com",
                salt: saltArr[0],
                hash: authCtrl._generateHash("joshspears", saltArr[0])
            },
            {
                email: "jason@daniel.com",
                salt: saltArr[1],
                hash: authCtrl._generateHash("jasondaniel", saltArr[1])
            },
            {
                email: "melodie@chi.com",
                salt: saltArr[2],
                hash: authCtrl._generateHash("melodiechi", saltArr[2])
            },
            {
                email: "rey@adam.com",
                salt: saltArr[3],
                hash: authCtrl._generateHash("reyadamcruz", saltArr[3])
            }
        ])
        // .then(() => {
        //     return models.Trip.bulkCreate(
        //         tripData
        //     ); // END CREATE
        // }).then(() => {
        //     return models.Location.bulkCreate(
        //         locationData
        //     ); // END CREATE
        // }).then(() => {
        //     return models.Trail.bulkCreate(
        //         trailData
        //     ); // END CREATE
        // }).then(() => {
        //     return models.Campsite.bulkCreate(
        //         campData
        //     ); // END CREATE
        // }).then(() => {
        //     return models.Activity.bulkCreate(
        //         activityData
        //     ); // END CREATE
        // }).then(() => {
        //     models.VisitorCenter.bulkCreate(
        //         centerData
        //     ); // END CREATE
        // }
        // ); // END CREATE
    } // END IF 


    app.listen(PORT, function () {
        console.log("=============================");
        console.log("App listening on PORT " + PORT);
        console.log("=============================");
    }); // END LISTEN

}); // END SYNC 