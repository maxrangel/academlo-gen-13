const express = require('express');

// Controllers
const {
	getAllMovies,
	getMovieById,
	createMovie,
	updateMovie,
	deleteMovie,
	assignActorToMovie,
} = require('../controllers/movies.controller');

const router = express.Router();

router.route('/').get(getAllMovies).post(createMovie);

router.post('/assign-actor', assignActorToMovie);

router.route('/:id').get(getMovieById).patch(updateMovie).delete(deleteMovie);

module.exports = { moviesRouter: router };
