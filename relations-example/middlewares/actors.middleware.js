// Models
const { Actor } = require('../models/actor.model');

// Utils
const { AppError } = require('../util/appError');
const { catchAsync } = require('../util/catchAsync');

exports.actorExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const actor = await Actor.findOne({ where: { id, status: 'active' } });

  if (!actor) {
    return next(new AppError(404, 'No actor found with that ID'));
  }

  req.actor = actor;
  next();
});
