class AppError extends Error {
	constructor(statusCode, message) {
		super(message);
		this.statusCode = statusCode;
		this.message = message;
		this.status = `${statusCode}`.startsWith('4') ? 'error' : 'fail';
		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = { AppError };
