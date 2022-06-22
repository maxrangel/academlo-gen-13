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
		const errorMsgs = errors.array().map(err => err.msg);

		const message = errorMsgs.join('. ');

		return res.status(400).json({ status: 'error', message });
	}

	next();
};

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);

usersRouter.post(
	'/',
	body('name').notEmpty().withMessage('Name cannot be empty'),
	body('age').isNumeric().withMessage('Age must be a number'),
	body('email').isEmail().withMessage('Must provide a valid email'),
	body('password')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters long')
		.isAlphanumeric()
		.withMessage('Password must contain letters and numbers'),
	checkResult,
	createUser
);

usersRouter.get('/:id', getUserById);

usersRouter.patch('/:id', updateUser);

usersRouter.delete('/:id', deleteUser);

module.exports = { usersRouter };
