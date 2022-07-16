const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	age: Number,
	email: String,
	password: String,
	status: String,
	hobbies: [String],
	address: {
		country: String,
		state: String,
		zipCode: Number,
	},
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
