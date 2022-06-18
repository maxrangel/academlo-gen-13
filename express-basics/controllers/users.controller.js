// Models
const { User } = require('../models/user.model');

const getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll();

		res.status(200).json({
			status: 'success',
			users,
		});
	} catch (err) {
		console.log(err);
	}
};

const createUser = async (req, res) => {
	try {
		const { name, age, email, password } = req.body;

		const newUser = await User.create({
			name,
			age,
			email,
			password,
		});

		res.status(201).json({
			status: 'success',
			newUser,
		});
	} catch (err) {
		console.log(err);
	}
};

module.exports = { getAllUsers, createUser };
