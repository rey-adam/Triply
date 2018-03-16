
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

    , models = require('./app_api/models')

    , PORT = process.env.PORT || 3001
    // ENVIRONMENT
    , isDev = process.env.NODE_ENV === 'development'
    // ROUTES
    , routes = require('./app_api/routes/indexRoutes');

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
if (isDev) {
    app.use(express.static('app_client/src/assets/'));
}

/*  
    =====================================================================================
    SYNC & START SERVERS
    ===================================================================================== 
*/

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
    ]); // END CREATE

    app.listen(PORT, function () {
        console.log("=============================");
        console.log("App listening on PORT " + PORT);
        console.log("=============================");
    }); // END LISTEN

}); // END SYNC 