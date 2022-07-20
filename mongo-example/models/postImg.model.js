const mongoose = require('mongoose');

const postImgSchema = new mongoose.Schema({
	imgUrl: {
		type: String,
		required: [true, 'Please provide an img url'],
	},
	postId: {
		type: mongoose.Schema.ObjectId,
		ref: 'Post',
	},
	status: {
		type: String,
		default: 'active',
	},
});

const PostImg = mongoose.model('PostImg', postImgSchema);

module.exports = { PostImg };
