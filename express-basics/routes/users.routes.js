const express = require('express');

// Models
const { User } = require('../models/user.model');

const usersRouter = express.Router();

usersRouter.get('/', async (req, res) => {
	try {
		const users = await User.findAll();

		res.status(200).json({
			status: 'success',
			users,
		});
	} catch (err) {
		console.log(err);
	}
});

usersRouter.post('/', (req, res) => {
	const { name } = req.body;

	const newUser = {
		id: Math.floor(Math.random() * 1000),
		name,
	};

	users.push(newUser);

	res.status(201).json({
		status: 'success',
		newUser,
	});
});

module.exports = { usersRouter };
