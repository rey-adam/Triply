// DEPENDENCIES
const express = require("express"),
        bodyParser = require("body-parser");

        // DB MODELS
// const db = require("./app_api/models");
// PORT
const PORT = process.env.PORT || 3001;
const app = express();
// ROUTES FILE CONTAINING OUR ROUTES
// const routes = require("./app_api/routes/employee.route");

// // BODY PARSER CONFIG
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.static('app_client/build'));

// API ROUTES
// app.use("/api", routes);

// // SYNC THE SQL DB AND THEN LISTEN TO PORT
// db.sequelize.sync({ force: true })
//     .then(() => {

//     }); // END APP LISTEN

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
}); // END THEN 