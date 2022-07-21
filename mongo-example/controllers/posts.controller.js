// Models
const { Post } = require('../models/post.model');
const { PostImg } = require('../models/postImg.model');
const { User } = require('../models/user.model');
const { Comment } = require('../models/comment.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { Email } = require('../utils/email.util');
const { uploadImage, getImage } = require('../utils/azureStorage.util');

const getAllPosts = catchAsync(async (req, res, next) => {
	const posts = await Post.find({ status: 'active' }, '_id title content')
		.populate({
			path: 'userId',
			select: '-password',
		})
		.populate({
			path: 'comments',
			match: { status: 'active' },
			populate: { path: 'userId', select: '-password' },
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
		userId: sessionUser._id,
	});

	// const blobName = `${Date.now()}_${req.file.originalname}`;

	// await uploadImage(req.file, blobName);

	// await PostImg.create({
	// 	postId: newPost.id,
	// 	imgUrl: blobName,
	// });

	// Send mail when post has been created
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
	const { title, content } = req.body;
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
