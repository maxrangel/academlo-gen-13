// Models
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const getAllUsers = catchAsync(async (req, res, next) => {
	const users = await User.findAll();

	res.status(200).json({
		status: 'success',
		users,
	});
});

const createUser = catchAsync(async (req, res, next) => {
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
});

const getUserById = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const user = await User.findOne({ where: { id } });

	if (!user) {
		return res.status(404).json({
			status: 'error',
			message: 'User not found',
		});
	}

	res.status(200).json({
		status: 'success',
		user,
	});
});

const updateUser = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const { name } = req.body;

	const user = await User.findOne({ where: { id } });

	if (!user) {
		return res.status(404).json({
			status: 'error',
			message: 'User not found',
		});
	}

	await user.update({ name });

	res.status(204).json({ status: 'success' });
});

const deleteUser = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const user = await User.findOne({ where: { id } });

	if (!user) {
		return res.status(404).json({
			status: 'error',
			message: 'User not found',
		});
	}

	// await user.destroy();
	await user.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

module.exports = {
	getAllUsers,
	createUser,
	getUserById,
	updateUser,
	deleteUser,
};
