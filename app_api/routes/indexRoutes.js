// =====================================================================================
// DEPENDENCIES / VARIABLES
// =====================================================================================
const express = require('express')
    , router = express.Router()
    , authRoutes = require('./auth/authRoutes')
    , apiRoutes = require('./api/apiRoutes')
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

// =====================================================================================
// EXPORT
// =====================================================================================
module.exports = router;