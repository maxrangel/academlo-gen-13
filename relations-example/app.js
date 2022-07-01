const express = require('express');

// Controllers
const { globalErrorHandler } = require('./controllers/error.controller');

// Routers
const { actorsRouter } = require('./routes/actors.routes');
const { moviesRouter } = require('./routes/movies.routes');

const app = express();

// Enable incoming JSON data
app.use(express.json());

// Endpoints
app.use('/api/v1/actors', actorsRouter);
app.use('/api/v1/movies', moviesRouter);

app.use(globalErrorHandler);

module.exports = { app };

// Gen random strings
// require('crypto').randomBytes(64).toString('hex');
