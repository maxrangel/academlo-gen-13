// Models
const { Post } = require('../models/post.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const getAllPosts = catchAsync(async (req, res, next) => {
	const posts = await Post.findAll();

	res.status(200).json({
		status: 'success',
		posts,
	});
});

const createPost = catchAsync(async (req, res, next) => {
	const { title, content, userId } = req.body;

	const newPost = await Post.create({
		title,
		content,
		userId,
	});

	res.status(201).json({
		status: 'success',
		newPost,
	});
});

const getPostById = catchAsync(async (req, res, next) => {
	const { post } = req;

	res.status(200).json({
		status: 'success',
		post,
	});
});

const updatePost = catchAsync(async (req, res, next) => {
	const { post } = req;

	await post.update({ title, content });

	res.status(204).json({ status: 'success' });
});

const deletePost = catchAsync(async (req, res, next) => {
	const { post } = req;

	await post.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

module.exports = {
	getAllPosts,
	createPost,
	getPostById,
	updatePost,
	deletePost,
};
