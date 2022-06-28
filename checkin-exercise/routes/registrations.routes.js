const express = require('express');

// Controllers
const {
	getAllRegistrations,
	getRegistrationById,
	checkin,
	checkout,
	cancelRegistration,
} = require('../controllers/registrations.controller');

const registrationsRouter = express.Router();

registrationsRouter.get('/', getAllRegistrations);

registrationsRouter.get('/:id', getRegistrationById);

registrationsRouter.post('/', checkin);

registrationsRouter.patch('/:id', checkout);

registrationsRouter.delete('/:id', cancelRegistration);

module.exports = { registrationsRouter };
