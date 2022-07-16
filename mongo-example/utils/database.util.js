const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const MONGO_URL = process.env.MONGO_URI;

mongoose.connection.once('open', () => {
	console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', err => {
	console.log(err);
});

const connectMongo = async () => {
	await mongoose.connect(MONGO_URL);
};

module.exports = { connectMongo };
