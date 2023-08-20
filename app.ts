require('dotenv').config();
const path = require('path');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const passport = require('./config/passport');
const cors = require('cors');
const { apis } = require('./routes');
const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
  origin: [
    // frontend url
    'http://localhost:3000',
    'http://localhost:5173',
    'https://isport-beginneraboutlife116.vercel.app',
    'https://isport-omega.vercel.app'
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use('/upload', express.static(path.join(__dirname, 'upload')));

app.use('/api', apis);

app.listen(port, () => console.log(`i-sport API app is listening on port ${port}`));

module.exports = app;