const express = require('express');

// Controllers
const { getAllPosts, createPost } = require('../controllers/posts.controller');

const postsRouter = express.Router();

postsRouter.get('/', getAllPosts);

postsRouter.post('/', createPost);

module.exports = { postsRouter };
