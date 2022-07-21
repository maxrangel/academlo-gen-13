// Models
const { Comment } = require('../models/comment.model');
const { User } = require('../models/user.model');
const { Post } = require('../models/post.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const getAllComments = catchAsync(async (req, res, next) => {
	// Deep includes

	const comments = await Comment.find({ status: 'active' })
		.populate({
			path: 'userId',
			select: '-password',
		})
		.populate({
			path: 'postId',
			populate: { path: 'userId', select: '-password' },
		});

	res.status(200).json({
		status: 'success',
		comments,
	});
});

const createComment = catchAsync(async (req, res, next) => {
	const { postId, comment } = req.body;
	const { sessionUser } = req;

	const newComment = await Comment.create({
		userId: sessionUser._id,
		postId,
		comment,
	});

	res.status(201).json({
		status: 'success',
		newComment,
	});
});

const getCommentById = catchAsync(async (req, res, next) => {
	const { comment } = req;

	res.status(200).json({
		status: 'success',
		comment,
	});
});

const updateComment = catchAsync(async (req, res, next) => {
	const { comment } = req;
	const { newComment } = req.body;

	await comment.update({ comment: newComment });

	res.status(204).json({
		status: 'success',
	});
});

const deleteComment = catchAsync(async (req, res, next) => {
	const { comment } = req;

	await comment.update({ status: 'deleted' });

	res.status(204).json({
		status: 'success',
	});
});

module.exports = {
	getAllComments,
	createComment,
	getCommentById,
	updateComment,
	deleteComment,
};
