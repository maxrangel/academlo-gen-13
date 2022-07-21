const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
	{
		comment: {
			type: String,
			required: [true, 'Please provide a comment'],
		},
		userId: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
		},
		postId: {
			type: mongoose.Schema.ObjectId,
			ref: 'Post',
		},
		status: {
			type: String,
			default: 'active',
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment };
