const path = require('path');

// Models
const { Post } = require('../models/post.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const renderIndex = catchAsync(async (req, res, next) => {
	const posts = await Post.findAll();

	res.status(200).render('index', {
		title: 'Rendered with Pug',
		posts,
	});

	// Serve static html
	// const indexPath = path.join(__dirname, '..', 'public', 'index.html');

	// res.status(200).sendFile(indexPath);
});

module.exports = { renderIndex };
