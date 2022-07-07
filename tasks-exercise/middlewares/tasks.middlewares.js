// Models
const { Task } = require('../models/task.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const taskExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findOne({
    where: { id, status: 'active' },
  });

  if (!task) {
    return next(new AppError('Task does not exist with given Id', 404));
  }

  // Add task data to the req object
  req.task = task;
  next();
});

module.exports = {
  taskExists,
};
