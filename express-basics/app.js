const express = require('express');

// Dummy data
const users = [
	{ id: 1, name: 'Max' },
	{ id: 2, name: 'Luis' },
	{ id: 3, name: 'John' },
];

const posts = [
	{ id: 1, title: 'Post #1' },
	{ id: 2, title: 'Post #2' },
	{ id: 3, title: 'Post #3' },
];

// Init express app
const app = express();

app.use(express.json());

// Define endpoints
app.get('/users', (req, res) => {
	// Process the request (return the list the users)
	res.status(200).json({
		status: 'success',
		users,
	});
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

app.listen(4000, () => {
	console.log('Express app running!!');
});
