const express = require('express');

// Controllers
const {
	getAllPosts,
	createPost,
	getPostById,
	updatePost,
	deletePost,
} = require('../controllers/posts.controller');

const postsRouter = express.Router();

postsRouter.get('/', getAllPosts);

postsRouter.post('/', createPost);

postsRouter.get('/:id', getPostById);

postsRouter.patch('/:id', updatePost);

postsRouter.delete('/:id', deletePost);

module.exports = { postsRouter };
