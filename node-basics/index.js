const http = require('http'); // CommonJS

const server = http.createServer(() => {
	console.log('Hello from server');
});

// localhost:4000
server.listen(4000);
