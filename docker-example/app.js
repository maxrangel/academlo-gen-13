const express = require('express');
const morgan = require('morgan');

const app = express();

// DUMMY DATA
const users = [
	{
		id: 1,
		name: 'Max',
	},
	{
		id: 2,
		name: 'Luis',
	},
	{
		id: 3,
		name: 'Fer',
	},
];

// Middlewares
app.use(express.json());

app.use(morgan('dev'));

app.get('/', (req, res) => {
	res.status(200).json({ status: 'success', users });
});

app.post('/', (req, res) => {
	const { name } = req.body;

	const newUser = { id: Math.floor(Math.random() * 1000), name };

	users.push(newUser);

	res.status(201).json({ status: 'success', newUser });
});

app.get('/:id', (req, res) => {
	const { id } = req.params;

	const user = users.find(user => user.id === +id);

	if (!user)
		return res.status(404).json({ status: 'error', message: 'User not found' });

	res.status(200).json({ status: 'success', user });
});

app.listen(80, () => {
	console.log('Express app running!');
});
