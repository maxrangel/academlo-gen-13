const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Please provide a title'],
		},
		content: {
			type: String,
			required: [true, 'Please provide a content'],
		},
		userId: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
		},
		status: {
			type: String,
			default: 'active',
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

postSchema.virtual('comments', {
	ref: 'Comment',
	foreignField: 'postId',
	localField: '_id',
});

const Post = mongoose.model('Post', postSchema);

module.exports = { Post };
