const express = require('express');

// Controllers
const {
	getAllUsers,
	createUser,
	getUserById,
	updateUser,
	deleteUser,
	login,
} = require('../controllers/users.controller');

// Middlewares
const {
	createUserValidators,
} = require('../middlewares/validators.middleware');
const { userExists } = require('../middlewares/users.middleware');
const { protectSession } = require('../middlewares/auth.middleware');

const usersRouter = express.Router();

usersRouter.post('/', createUserValidators, createUser);

usersRouter.post('/login', login);

usersRouter.use(protectSession);

usersRouter.get('/', getAllUsers);

usersRouter
	.use('/:id', userExists)
	.route('/:id')
	.get(getUserById)
	.patch(updateUser)
	.delete(deleteUser);

module.exports = { usersRouter };
