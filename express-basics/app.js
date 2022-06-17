const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

// Connect to database
const db = new Sequelize({
	dialect: 'postgres',
	host: 'localhost',
	username: 'postgres',
	password: 'pass1234',
	port: 5432,
	database: 'facebook',
});

db.authenticate()
	.then(() => console.log('Db authenticated'))
	.catch(err => console.log(err));

db.sync()
	.then(() => console.log('Db synced'))
	.catch(err => console.log(err));

// Create our first model (table)
const User = db.define('user', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	age: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

// // Dummy data
// const users = [
// 	{ id: 1, name: 'Max' },
// 	{ id: 2, name: 'Luis' },
// 	{ id: 3, name: 'John' },
// ];

// const posts = [
// 	{ id: 1, title: 'Post #1' },
// 	{ id: 2, title: 'Post #2' },
// 	{ id: 3, title: 'Post #3' },
// ];

// Init express app
const app = express();

app.use(express.json());

// Define endpoints
app.get('/users', async (req, res) => {
	try {
		const users = await User.findAll();

		res.status(200).json({
			status: 'success',
			users,
		});
	} catch (err) {
		console.log(err);
	}
});

app.post('/users', (req, res) => {
	const { name } = req.body;

	const newUser = {
		id: Math.floor(Math.random() * 1000),
		name,
	};

	users.push(newUser);

	res.status(201).json({
		status: 'success',
		newUser,
	});
});

app.get('/posts', (req, res) => {
	res.status(200).json({
		status: 'success',
		posts,
	});
});

app.post('/posts', (req, res) => {
	const { title } = req.body;

	const newPost = {
		id: Math.floor(Math.random() * 1000),
		title,
	};

	posts.push(newPost);

	res.status(201).json({
		status: 'success',
		newPost,
	});
});

app.listen(4000, () => {
	console.log('Express app running!!');
});
