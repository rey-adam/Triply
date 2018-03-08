// DEPENDENCIES
const express = require("express"),
    bodyParser = require("body-parser"),

    // DB MODELS
    db = require("./app_api/models"),

    // PORT
    PORT = process.env.PORT || 3001,
    app = express();

// ROUTES FILE CONTAINING OUR ROUTES
// const routes = require("./app_api/routes/");

// BODY PARSER CONFIG
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('app_client/build'));

// API ROUTES
// app.use("/api", routes);

// SYNC THE SQL DB AND THEN LISTEN TO PORT
db.sequelize.sync({ force: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listening on PORT: ${PORT}`);
        }); // END THEN 
    }); // END APP LISTEN

