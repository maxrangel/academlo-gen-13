const http = require('http'); // CommonJS

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

const server = http.createServer((request, response) => {
	const { method, url } = request;

	response.setHeader('Content-Type', 'application/json');

	// Endpoint GET /users
	if (method === 'GET' && url === '/users') {
		// Return list of users
		response.write(JSON.stringify(users));
	} else if (method === 'GET' && url === '/posts') {
		// Return list of posts
		response.write(JSON.stringify(posts));
	} else {
		// No endpoint matched
		response.write(
			JSON.stringify({
				message: `${method} ${url} not found in this server`,
			})
		);
	}

	response.end();
});

// localhost:4000
server.listen(4000);
