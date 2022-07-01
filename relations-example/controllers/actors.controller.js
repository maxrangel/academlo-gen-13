// Models
const { Actor } = require('../models/actor.model');
const { Movie } = require('../models/movie.model');

// Utils
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

exports.getAllActors = catchAsync(async (req, res, next) => {
	const actors = await Actor.findAll({
		where: { status: 'active' },
		include: [{ model: Movie }],
	});

	res.status(200).json({
		status: 'success',
		data: { actors },
	});
});

exports.getActorById = catchAsync(async (req, res, next) => {
	const { actor } = req;

	res.status(200).json({
		status: 'success',
		data: { actor },
	});
});

exports.createActor = catchAsync(async (req, res, next) => {
	const { name, country, rating, age } = req.body;

	const newActor = await Actor.create({
		name,
		country,
		rating,
		age,
	});

	res.status(200).json({
		status: 'success',
		data: { newActor },
	});
});

exports.updateActor = catchAsync(async (req, res, next) => {
	const { actor } = req;
	const { name, country, rating, age } = req.body;

	await actor.update({ name, country, rating, age });

	res.status(204).json({ status: 'success' });
});

exports.deleteActor = catchAsync(async (req, res, next) => {
	const { actor } = req;

	await actor.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});
