const path = require('path');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const renderIndex = catchAsync(async (req, res, next) => {
	// Serve static html
	const indexPath = path.join(__dirname, '..', 'public', 'index.html');
	res.status(200).sendFile(indexPath);
});

module.exports = { renderIndex };
