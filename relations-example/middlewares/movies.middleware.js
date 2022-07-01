// Models
const { Movie } = require('../models/movie.model');

// Utils
const { AppError } = require('../util/appError');
const { catchAsync } = require('../util/catchAsync');

exports.movieExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findOne({ where: { id, status: 'active' } });

  if (!movie) {
    return next(new AppError(404, 'No movie found with that ID'));
  }

  req.movie = movie;
  next();
});
