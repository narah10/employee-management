const express = require('express');
const app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/index')
const mongodb = require('./db/connect')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = process.env.PORT || 8080
 
// app.get('/', (req, res) => {
//   res.send("Hello");
// });
 
// app.listen(process.env.PORT || port, () => {
//   console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
// });


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