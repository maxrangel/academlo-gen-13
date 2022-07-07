const express = require('express');

// Controllers
const {
	getAllPosts,
	createPost,
	getPostById,
	updatePost,
	deletePost,
} = require('../controllers/posts.controller');

// Middlewares
const { postExists } = require('../middlewares/posts.middleware');
const { protectSession } = require('../middlewares/auth.middleware');

const postsRouter = express.Router();

postsRouter.use(protectSession);

postsRouter.route('/').get(getAllPosts).post(createPost);

postsRouter
	.use('/:id', postExists)
	.route('/:id')
	.get(getPostById)
	.patch(updatePost)
	.delete(deletePost);

module.exports = { postsRouter };
