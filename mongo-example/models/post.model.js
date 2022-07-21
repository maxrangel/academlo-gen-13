const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
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
});

// Create virtaul property for comments

const Post = mongoose.model('Post', postSchema);

module.exports = { Post };
