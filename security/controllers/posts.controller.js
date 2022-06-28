// Models
const { Post } = require('../models/post.model');

const getAllPosts = async (req, res) => {
	try {
		const posts = await Post.findAll();

		res.status(200).json({
			status: 'success',
			posts,
		});
	} catch (err) {
		console.log(err);
	}
};

const createPost = async (req, res) => {
	try {
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
	} catch (err) {
		next(err);
	}
};

const getPostById = async (req, res) => {
	const { id } = req.params;

	const post = await Post.findOne({ where: { id } });

	if (!post) {
		return res.status(404).json({
			status: 'error',
			message: 'Post not found',
		});
	}

	res.status(200).json({
		status: 'success',
		post,
	});
};

const updatePost = async (req, res, next) => {
	const { id } = req.params;
	const { title, content } = req.body;

	const post = await Post.findOne({ where: { id } });

	if (!post) {
		return res.status(404).json({
			status: 'error',
			message: 'Post not found',
		});
	}

	await post.update({ title, content });

	res.status(204).json({ status: 'success' });
};

const deletePost = async (req, res) => {
	const { id } = req.params;

	const post = await Post.findOne({ where: { id } });

	if (!post) {
		return res.status(404).json({
			status: 'error',
			message: 'Post not found',
		});
	}

	await post.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
};

module.exports = {
	getAllPosts,
	createPost,
	getPostById,
	updatePost,
	deletePost,
};
