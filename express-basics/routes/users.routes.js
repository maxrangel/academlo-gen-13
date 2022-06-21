const express = require('express');
const { body, validationResult } = require('express-validator');

// Controllers
const {
	getAllUsers,
	createUser,
	getUserById,
	updateUser,
	deleteUser,
} = require('../controllers/users.controller');

const checkResult = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// Array has errors

		errors.array(); // [{ value, msg, param, location }, { value, msg, param, location }, ...]
		// Step 1: Loop through array of errors
		// Step 2: Get all error msg's [msg, msg, msg]
		// Step 3: Combine (join), all strings in the array
		// Step 4: Send the combined msg in the response

		return res.status(400).json({ status: 'error', message: '' });
	}

	next();
};

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);

usersRouter.post(
	'/',
	body('name').notEmpty(),
	body('age').isNumeric(),
	body('email').isEmail(),
	body('password').isLength({ min: 8 }).isAlphanumeric(),
	checkResult,
	createUser
);

usersRouter.get('/:id', getUserById);

usersRouter.patch('/:id', updateUser);

usersRouter.delete('/:id', deleteUser);

module.exports = { usersRouter };
