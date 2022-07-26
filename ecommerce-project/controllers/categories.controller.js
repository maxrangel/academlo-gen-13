// Models
const { Category } = require('../models/category.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.findAll({ where: { status: 'active' } });

  res.status(200).json({ categories });
});

const createCategory = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  if (name.length === 0) {
    return next(new AppError('Name cannot be empty', 400));
  }

  const newCategory = await Category.create({ name });

  res.status(201).json({
    newCategory,
  });
});

const updateCategory = catchAsync(async (req, res, next) => {
  const { newName } = req.body;
  const { id } = req.params;

  const category = await Category.findOne({
    where: { id, status: 'active' },
  });

  if (!category) {
    return next(new AppError('Category does not exits with given id', 404));
  }

  if (newName.length === 0) {
    return next(new AppError('The updated name cannot be empty', 400));
  }

  await category.update({ name: newName });

  res.status(200).json({ status: 'success' });
});

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
};
