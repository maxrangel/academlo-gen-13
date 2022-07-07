const path = require('path');

const renderIndex = (req, res, next) => {
	console.log(__dirname);

	const indexPath = path.join(__dirname, '..', 'public', 'index.html');

	res.status(200).sendFile(indexPath);
};

module.exports = { renderIndex };

// D:\Development\academlo\gen-13\heroku-example\controllers
// D:\Development\academlo\gen-13\heroku-example
// D:\Development\academlo\gen-13\heroku-example\public
// D:\Development\academlo\gen-13\heroku-example\public\index.html
