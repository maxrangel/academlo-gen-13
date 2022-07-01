// Models
const { Movie } = require('../models/movie.model');
const { Actor } = require('../models/actor.model');
const { ActorInMovie } = require('../models/actorInMovie.model');

// Utils
const { catchAsync } = require('../util/catchAsync');

exports.getAllMovies = catchAsync(async (req, res, next) => {
	const movies = await Movie.findAll({
		where: { status: 'active' },
		include: Actor,
	});

	res.status(200).json({
		status: 'success',
		data: { movies },
	});
});

exports.getMovieById = catchAsync(async (req, res, next) => {
	const { movie } = req;

	res.status(200).json({
		status: 'success',
		data: { movie },
	});
});

exports.createMovie = catchAsync(async (req, res, next) => {
	const { title, description, duration, rating, genre } = req.body;

	const newMovie = await Movie.create({
		title,
		description,
		duration,
		rating,
		genre,
	});

	res.status(200).json({
		status: 'success',
		data: { newMovie },
	});
});

exports.updateMovie = catchAsync(async (req, res, next) => {
	const { movie } = req;
	const { title, description, duration, rating, genre } = req.body;

	await movie.update({ title, description, duration, rating, genre });

	res.status(204).json({ status: 'success' });
});

exports.deleteMovie = catchAsync(async (req, res, next) => {
	const { movie } = req;

	await movie.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

exports.assignActorToMovie = catchAsync(async (req, res, next) => {
	const { actorId, movieId } = req.body;

	const actorInMovie = await ActorInMovie.create({ actorId, movieId });

	res.status(201).json({
		status: 'success',
		actorInMovie,
	});
});
