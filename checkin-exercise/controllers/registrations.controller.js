// Models
const { Registration } = require('../models/registration.model');

const getAllRegistrations = async (req, res, next) => {
	try {
		const registrations = await Registration.findAll();

		res.status(200).json({ registrations });
	} catch (err) {}
};

const getRegistrationById = async (req, res, next) => {
	try {
		const { id } = req.params;

		const registration = await Registration.findOne({ where: { id } });

		if (!registration) {
			return res.status(404).json({
				status: 'error',
				message: 'Registration no found',
			});
		}

		res.status(200).json({ registration });
	} catch (err) {}
};

const checkin = async (req, res, next) => {
	try {
		const { entranceTime } = req.body;

		const newRegistration = await Registration.create({ entranceTime });

		res.status(201).json({
			newRegistration,
		});
	} catch (err) {
		console.log(err);
	}
};

const checkout = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { exitTime } = req.body;

		const registration = await Registration.findOne({ where: { id } });

		if (!registration) {
			return res.status(404).json({
				status: 'error',
				message: 'Registration no found',
			});
		}

		await registration.update({ exitTime, status: 'out' });

		res.status(204).json({ status: 'success' });
	} catch (err) {}
};

const cancelRegistration = async (req, res, next) => {
	try {
		const { id } = req.params;

		const registration = await Registration.findOne({ where: { id } });

		if (!registration) {
			return res.status(404).json({
				status: 'error',
				message: 'Registration no found',
			});
		}

		await registration.update({ status: 'cancelled' });

		res.status(204).json({ status: 'success' });
	} catch (err) {}
};

module.exports = {
	getAllRegistrations,
	getRegistrationById,
	checkin,
	checkout,
	cancelRegistration,
};
