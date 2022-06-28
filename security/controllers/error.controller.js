const globalErrorHandler = (err, req, res, next) => {
	const statusCode = err.statusCode || 500;

	res.status(statusCode).json({
		status: 'fail',
		message: err.message,
		error: err,
		stack: err.stack,
	});
};

module.exports = { globalErrorHandler };
