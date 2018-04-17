// =====================================================================================
// DEPENDENCIES / VARIABLES
// =====================================================================================
const express = require('express')
    , router = express.Router()
    , authRoutes = require('./auth/authRoutes')
    , apiRoutes = require('./api/apiRoutes')
    // ROUTES
    , activityRoute = require("./api/activity.route")
    , campsiteRoute = require("./api/campsite.route")
    , visitorCenterRoute = require("./api/visitorCenter.route")
    , locationRoute = require("./api/location.route")
    , trailRoute = require("./api/trail.route")
    , tripRoute = require("./api/trip.route")
    , userRoute = require("./api/user.route")
    
    , jwt = require('express-jwt');

// =====================================================================================
// ROUTES
// =====================================================================================

// unprotected routes
router.use('/auth', authRoutes);

// authentication middleware: every route declared after this use statement is protected
router.use(jwt({ secret: process.env.JWT_SECRET }));

// protected routes
router.use('/api', apiRoutes);

/*  
    =====================================================================================
    MODEL ROUTES
    ===================================================================================== 
*/

router.use("/api", activityRoute);
router.use("/api", campsiteRoute);
router.use("/api", visitorCenterRoute);
router.use("/api", locationRoute);
router.use("/api", trailRoute);
router.use("/api", tripRoute);
router.use("/api", userRoute);

module.exports = router;