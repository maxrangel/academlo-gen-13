// Models
const { Cart } = require('../models/cart.model');
const { Product } = require('../models/product.model');
const { ProductInCart } = require('../models/productInCart.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const getUserCart = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const cart = await Cart.findOne({
    where: { userId: sessionUser.id, status: 'active' },
    include: [
      {
        model: ProductInCart,
        required: false,
        where: { status: 'active' },
        include: { model: Product },
      },
    ],
  });

  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }

  res.status(200).json({ status: 'success', cart });
});

const addProductToCart = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { productId, quantity } = req.body;

  // Validate input qty
  const product = await Product.findOne({
    where: { id: productId, status: 'active' },
  });

  if (!product) {
    return next(new AppError('Invalid product', 404));
  } else if (quantity > product.quantity) {
    return next(
      new AppError(
        `This product only has ${product.quantity} items available`,
        400
      )
    );
  }

  // Check if cart exists
  const cart = await Cart.findOne({
    where: { status: 'active', userId: sessionUser.id },
  });

  if (!cart) {
    // Create new cart for user
    const newCart = await Cart.create({ userId: sessionUser.id });

    // Add product to newly created cart
    await ProductInCart.create({
      cartId: newCart.id,
      productId,
      quantity,
    });
  } else {
    // Cart already exists
    // Check if product already exists in cart
    const productExists = await ProductInCart.findOne({
      where: { cartId: cart.id, productId },
    });

    if (productExists) {
      return next(new AppError('Product is already in the cart', 400));
    }

    await ProductInCart.create({ cartId: cart.id, productId, quantity });
  }

  res.status(200).json({ status: 'success' });
});

const updateProductInCart = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { productId, newQty } = req.body;

  // Validate input qty
  const product = await Product.findOne({
    where: { id: productId, status: 'active' },
  });

  if (!product) {
    return next(new AppError('Invalid product', 404));
  } else if (newQty > product.quantity) {
    return next(
      new AppError(
        `This product only has ${product.quantity} items available`,
        400
      )
    );
  }

  const cart = await Cart.findOne({
    where: { userId: sessionUser.id, status: 'active' },
  });

  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }

  const productInCart = await ProductInCart.findOne({
    cartId: cart.id,
    productId,
    status: 'active',
  });

  if (!productInCart) {
    return next(new AppError('Product not found in cart', 404));
  }

  if (newQty <= 0) {
    await productInCart.update({ quantity: 0, status: 'removed' });
  } else if (newQty > 0) {
    await productInCart.update({ quantity: newQty });
  }

  res.status(200).json({ status: 'success' });
});

const purchaseCart = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const cart = await Cart.findOne({
    where: { userId: sessionUser.id, status: 'active' },
    include: [
      {
        model: ProductInCart,
        required: false,
        where: { status: 'active' },
        include: { model: Product },
      },
    ],
  });

  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }

  let totalPrice = 0;

  const productsPurchasedPromises = cart.productInCarts.map(
    async productInCart => {
      const newQty = productInCart.product.quantity - productInCart.quantity;

      const productPrice =
        productInCart.quantity * +productInCart.product.price;

      totalPrice += productPrice;

      await productInCart.product.update({ quantity: newQty });

      return await productInCart.update({ status: 'purchased' });
    }
  );

  await Promise.all(productsPurchasedPromises);

  res.status(200).json({ status: 'success' });
});

const removeProductFromCart = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { productId } = req.params;

  const cart = await Cart.findOne({
    where: { userId: sessionUser.id, status: 'active' },
  });

  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }

  const productInCart = await ProductInCart.findOne({
    cartId: cart.id,
    productId,
    status: 'active',
  });

  if (!productInCart) {
    return next(new AppError('Product not found in cart', 404));
  }

  await productInCart.update({ status: 'removed', quantity: 0 });

  res.status(200).json({ status: 'success' });
});

module.exports = {
  addProductToCart,
  updateProductInCart,
  purchaseCart,
  removeProductFromCart,
  getUserCart,
};
