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

  res.status(201).json({});
});

const getTasksByStatus = catchAsync(async (req, res, next) => {
  res.status(200).json({});
});

const updateTask = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
});

const deleteTask = catchAsync(async (req, res, next) => {
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
