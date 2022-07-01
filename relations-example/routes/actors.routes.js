const express = require('express');

// Controllers
const {
	getAllActors,
	getActorById,
	createActor,
	updateActor,
	deleteActor,
} = require('../controllers/actors.controller');

const router = express.Router();

router.route('/').get(getAllActors).post(createActor);

router.route('/:id').get(getActorById).patch(updateActor).delete(deleteActor);

module.exports = { actorsRouter: router };
