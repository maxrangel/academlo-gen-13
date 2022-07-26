// Models
const { Product } = require('../models/product.model');
const { Category } = require('../models/category.model');
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.findAll({
    where: { status: 'active' },
    include: [
      { model: Category, attributes: ['name'] },
      { model: User, attributes: ['username', 'email'] },
    ],
  });

  res.status(200).json({ products });
});

const getProductById = catchAsync(async (req, res, next) => {
  const { product } = req;

  res.status(200).json({ product });
});

const createProduct = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { title, description, quantity, price, categoryId } = req.body;

  const newProduct = await Product.create({
    title,
    description,
    quantity,
    categoryId,
    price,
    userId: sessionUser.id,
  });

  res.status(201).json({ newProduct });
});

const updateProduct = catchAsync(async (req, res, next) => {
  const { product } = req;
  const { title, description, quantity, price } = req.body;

  await product.update({ title, description, quantity, price });

  res.status(200).json({ status: 'success' });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const { product } = req;

  await product.update({ status: 'removed' });

  res.status(200).json({ status: 'success' });
});

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
