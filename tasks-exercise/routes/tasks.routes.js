const express = require('express');

// Middlewares
const { taskExists } = require('../middlewares/tasks.middlewares');
const {
  createTaskValidations,
} = require('../middlewares/validations.middlewares');

// Controller
const {
  createTask,
  getAllTasks,
  getTasksByStatus,
  updateTask,
  deleteTask,
} = require('../controllers/tasks.controller');

const router = express.Router();

router.post('/', createTaskValidations, createTask);

router.get('/', getAllTasks);

router.get('/:status', getTasksByStatus);

router
  .route('/:id')
  .patch(taskExists, updateTask)
  .delete(taskExists, deleteTask);

module.exports = { tasksRouter: router };
