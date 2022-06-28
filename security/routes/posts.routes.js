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

const postsRouter = express.Router();

postsRouter.get('/', getAllPosts);

postsRouter.post('/', createPost);

postsRouter.get('/:id', postExists, getPostById);

postsRouter.patch('/:id', postExists, updatePost);

postsRouter.delete('/:id', postExists, deletePost);

module.exports = { postsRouter };
