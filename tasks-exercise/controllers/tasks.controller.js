// Models
const { Task } = require('../models/task.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const getAllTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.findAll();

  res.status(200).json({
    tasks,
  });
});

const createTask = catchAsync(async (req, res, next) => {
  const { title, userId, limitDate, startDate } = req.body;

  const newTask = await Task.create({ title, userId, limitDate, startDate });

  res.status(201).json({ newTask });
});

const getTasksByStatus = catchAsync(async (req, res, next) => {
  const { status } = req.params;

  const validStatus = ['active', 'completed', 'late', 'cancelled'];

  const isValid = validStatus.find(el => el === status);

  if (!isValid) {
    return next(
      new AppError(
        'Status must be either active, completed, late or cancelled',
        400
      )
    );
  }

  const tasks = await Task.findAll({ where: { status } });

  res.status(200).json({ tasks });
});

const updateTask = catchAsync(async (req, res, next) => {
  const { task } = req;
  const { finishDate } = req.body;

  // Get numerical values of the dates
  const limitDateNum = new Date(task.limitDate).getTime();
  const finishDateNum = new Date(finishDate).getTime();

  const remainingTime = limitDateNum - finishDateNum;

  if (remainingTime > 0) {
    await task.update({ finishDate, status: 'completed' });
  } else if (remainingTime < 0) {
    await task.update({ finishDate, status: 'late' });
  }

  res.status(200).json({
    status: 'success',
    task,
  });
});

const deleteTask = catchAsync(async (req, res, next) => {
  const { task } = req;

  await task.update({ status: 'cancelled' });

  res.status(200).json({
    status: 'success',
  });
});

module.exports = {
  getAllTasks,
  createTask,
  getTasksByStatus,
  updateTask,
  deleteTask,
};
