const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please provide a valid name'],
		},
		age: {
			type: Number,
			required: [true, 'Please enter your age'],
		},
		email: {
			type: String,
			required: [true, 'Please enter your email'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Please enter your password'],
		},
		status: {
			type: String,
			default: 'active',
		},
		// posts
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

userSchema.virtual('posts', {
	ref: 'Post',
	foreignField: 'userId',
	localField: '_id',
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
