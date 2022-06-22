const express = require('express');

// Controllers
const {
	getAllUsers,
	createUser,
	getUserById,
	updateUser,
	deleteUser,
} = require('../controllers/users.controller');

// Middlewares
const {
	createUserValidators,
} = require('../middlewares/validators.middleware');

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);

usersRouter.post('/', createUserValidators, createUser);

usersRouter.get('/:id', getUserById);

usersRouter.patch('/:id', updateUser); // next()

usersRouter.delete('/:id', deleteUser);

module.exports = { usersRouter };
