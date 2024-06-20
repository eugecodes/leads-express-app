const express = require('express');
//const swaggerUi = require('swagger-ui-express');
//const swaggerAutogen = require('swagger-autogen')();
//const swaggerFile = require('swagger_output.json');
const routes = require('./routes');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(routes);
app.use(cors())
// Handling Errors

const doc = {
  info: {
      title: "Manatee Api",
      description: "Description"
  },
  host: "localhost:3000",
  schemes: ['http']
};

//const outputFile = 'swagger-output.json';
//const endpointsFiles = 'routes.js';

app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

app.listen(process.env.PORT || 3000, () => console.log('Server is running on port 3000'));