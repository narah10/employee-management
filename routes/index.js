const express = require('express');
// const dotenv = require('dotenv')
const router = express.Router();
// const { auth } = require('express-openid-connect');
// dotenv.config();

// const config = {
//   authRequired: false, // Set to false by default to allow access to unauthenticated users
//   auth0Logout: true,
//   secret: process.env.SESSION_SECRET,
//   baseURL: process.env.BASE_URL,
//   clientID: process.env.AUTH0_CLIENT_ID,
//   issuerBaseURL: process.env.AUTH0_ISSUER_BASEURL
// };

// auth router attaches /login, /logout, and /callback routes to the baseURL
// router.use(auth(config));

// const checkAuthentication = (req, res, next) => {
//   if (req.oidc.isAuthenticated()) {
//     next();
//   } else {
//     res.redirect('/login'); 
//   }
// };

// Apply the authentication check middleware to the '/employees' route
router.use('/employees', require('./employees'));

router.use('/department', require('./department'));
router.use('/', require('./swagger'));

module.exports = router;
