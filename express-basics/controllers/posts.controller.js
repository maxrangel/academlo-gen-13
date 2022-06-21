const { Post } = require('../models/post.model');

const getAllPosts = async (req, res) => {
	try {
		const posts = await Post.findAll();

		res.status(200).json({
			status: 'success',
			posts,
		});
	} catch (error) {
		console.log(error);
	}
};

const createPost = (req, res) => {
	const { title } = req.body;

	const newPost = {
		id: Math.floor(Math.random() * 1000),
		title,
	};

	posts.push(newPost);

	res.status(201).json({
		status: 'success',
		newPost,
	});
};

module.exports = { getAllPosts, createPost };
