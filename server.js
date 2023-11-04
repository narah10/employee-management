const express = require('express');
const app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { auth } = require('express-openid-connect');

require('dotenv').config();

const port = process.env.PORT;

const config = {
  authRequired: true, // Set to true to enforce authentication for all routes
  auth0Logout: true,
  secret: process.env.SESSION_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASEURL
};

app.use(auth(config));

// Public route
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', (req, res) => {
  // Requires authentication
  if (!req.oidc.isAuthenticated()) {
    return res.status(401).send('Not logged in');
  }
  res.send(JSON.stringify(req.oidc.user));
});

app
  .use(cors())
  .use(bodyParser.json())
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', routes);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
