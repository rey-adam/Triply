// DEPENDENCIES
const
    express = require("express"),
    bodyParser = require("body-parser"),

    // DB MODELS
    db = require("./app_api/models"),

    // PORT
    PORT = process.env.PORT || 3001,
    app = express(),

    // ROUTES FILE CONTAINING OUR ROUTES
    tripRoute = require("./app_api/routes/model/trip.route"),
    locationRoute = require("./app_api/routes/model/location.route"),
    trailRoute = require("./app_api/routes/model/trail.route");
    

// BODY PARSER CONFIG
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('app_client/build'));

// MODEL ROUTES
app.use("/api", tripRoute);
app.use("/api", locationRoute);
app.use("/api", trailRoute);

// SYNC THE SQL DB AND THEN LISTEN TO PORT
db.sequelize.sync({ force: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listening on PORT: ${PORT}`);

        }); // END THEN 
    }); // END APP LISTEN
