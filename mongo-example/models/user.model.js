const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
	address: {
		country: {
			type: String,
			required: [true, 'Must provide your country name'],
		},
		state: {
			type: String,
			required: [true, 'Must provide a valid state'],
		},
		zipCode: {
			type: String,
			required: [true, 'Must provide your zipcode'],
			minlength: 5,
		},
	},
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
