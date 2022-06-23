const express = require('express');

// Routers
const { usersRouter } = require('./routes/users.routes');
const { postsRouter } = require('./routes/posts.routes');

// Init express app
const app = express();

app.use(express.json());

// Define endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/posts', postsRouter);

// Global error handler
app.use('*', (err, req, res, next) => {
	res.status(500).json({
		status: 'fail',
		error: err,
	});
});

module.exports = { app };
