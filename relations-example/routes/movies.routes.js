const express = require('express');

// Controllers
const {
	getAllMovies,
	getMovieById,
	createMovie,
	updateMovie,
	deleteMovie,
} = require('../controllers/movies.controller');

const router = express.Router();

router.route('/').get(getAllMovies).post(createMovie);

router.route('/:id').get(getMovieById).patch(updateMovie).delete(deleteMovie);

module.exports = { moviesRouter: router };
