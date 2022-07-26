const express = require('express');

// Middlewares
const {
  userExists,
  protectAccountOwner,
} = require('../middlewares/users.middlewares');
const { protectSession } = require('../middlewares/auth.middlewares');
const {
  createUserValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

// Controller
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
  checkToken,
  getUserProducts,
  getUserOrders,
  getUserOrderById,
} = require('../controllers/users.controller');

const router = express.Router();

router.post('/', createUserValidations, checkValidations, createUser);

router.post('/login', login);

router.use(protectSession);

router.get('/', getAllUsers);

router.get('/me', getUserProducts);

router.get('/orders', getUserOrders);

router.get('/orders/:id', getUserOrderById);

router.get('/check-token', checkToken);

router
  .route('/:id')
  .get(userExists, getUserById)
  .patch(userExists, protectAccountOwner, updateUser)
  .delete(userExists, protectAccountOwner, deleteUser);

module.exports = { usersRouter: router };
