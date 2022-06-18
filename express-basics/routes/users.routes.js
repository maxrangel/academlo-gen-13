const express = require('express');

// Controllers
const { getAllUsers, createUser } = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);

usersRouter.post('/', createUser);

module.exports = { usersRouter };
