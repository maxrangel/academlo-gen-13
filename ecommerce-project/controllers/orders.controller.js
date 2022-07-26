// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const getUserCart = catchAsync(async (req, res, next) => {
  res.status(200).json({ status: 'success' });
});

const addProductToCart = catchAsync(async (req, res, next) => {
  res.status(200).json({ status: 'success' });
});

const updateProductInCart = catchAsync(async (req, res, next) => {
  res.status(200).json({ status: 'success' });
});

const purchaseCart = catchAsync(async (req, res, next) => {
  res.status(200).json({ status: 'success' });
});

const removeProductFromCart = catchAsync(async (req, res, next) => {
  res.status(200).json({ status: 'success' });
});

module.exports = {
  addProductToCart,
  updateProductInCart,
  purchaseCart,
  removeProductFromCart,
  getUserCart,
};
