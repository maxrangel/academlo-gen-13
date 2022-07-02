const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

dotenv.config({ path: './config.env' });

const protectSession = catchAsync(async (req, res, next) => {
	let token;

	// Extract the token from headers
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		return next(new AppError('Invalid session', 403));
	}

	// Ask JWT (library), if the token is still valid
	const decoded = await jwt.verify(token, process.env.JWT_SECRET);
	// { id, ... }

	// Check in db that user still exists
	const user = await User.findOne({
		where: { id: decoded.id, status: 'active' },
	});

	if (!user) {
		return next(
			new AppError('The owner of this token doesnt exist anymore', 403)
		);
	}

	// Grant access
	req.sessionUser = user;
	next();
});

// Create middleware that:
// 1. Get the session user's id
// 2. Validate that the user that is being updated/deleted is the same as the session user
// 3. If the id's don't match, return error (403)
// 4. Apply middleware only in PATCH and DELETE endpoints
const protectUserAccount = () => {};

module.exports = { protectSession };
