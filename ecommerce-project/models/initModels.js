const { User } = require('./user.model');
const { Product } = require('./product.model');
const { Cart } = require('./cart.model');
const { ProductInCart } = require('./productInCart.model');
const { Order } = require('./order.model');
const { ProductImg } = require('./productImg.model');
const { Category } = require('./category.model');

// Establish your models relations inside this function
const initModels = () => {
  // 1 User <--> M Product
  User.hasMany(Product);
  Product.belongsTo(User);

  // 1 User <--> M Order
  User.hasMany(Order);
  Order.belongsTo(User);

  // 1 User <--> 1 Cart
  User.hasOne(Cart);
  Cart.belongsTo(User);

  // 1 Product <--> M ProductImg
  Product.hasMany(ProductImg);
  ProductImg.belongsTo(Product);

  // 1 Category <--> 1 Product
  Category.hasOne(Product);
  Product.belongsTo(Category);

  // 1 Cart <--> M ProductInCart
  Cart.hasMany(ProductInCart);
  ProductInCart.belongsTo(Cart);

  // 1 Product <--> 1 ProductInCart
  Product.hasOne(ProductInCart);
  ProductInCart.belongsTo(Product);

  // 1 Order <--> 1 Cart
  Cart.hasOne(Order);
  Order.belongsTo(Cart);
};

module.exports = { initModels };
