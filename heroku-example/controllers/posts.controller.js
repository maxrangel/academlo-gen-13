// Models
const { Post } = require('../models/post.model');
const { User } = require('../models/user.model');
const { Comment } = require('../models/comment.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { Email } = require('../utils/email.util');

const getAllPosts = catchAsync(async (req, res, next) => {
	// Include user (post's author)
	// Include comments
	// Include user (comment's author)
	const posts = await Post.findAll({
		attributes: ['id', 'title', 'content'],
		include: [
			{ model: User, attributes: ['id', 'name', 'email'] },
			{
				model: Comment,
				attributes: ['id', 'comment'],
				include: {
					model: User,
					attributes: ['id', 'name', 'email'],
				},
			},
		],
	});

	res.status(200).json({
		status: 'success',
		posts,
	});
});

const createPost = catchAsync(async (req, res, next) => {
	const { title, content } = req.body;
	const { sessionUser } = req;

	const newPost = await Post.create({
		title,
		content,
		userId: sessionUser.id,
	});

	// Send mail when post has been created
	// 3. Give some style to the email
	await new Email(sessionUser.email).sendNewPost(title, content);

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
