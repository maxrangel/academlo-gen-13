const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, '/imgs');
	},
	filename: (req, file, cb) => {
		console.log(file);
		cb(null, 'test.png');
	},
});

const upload = multer({ storage });

module.exports = { upload };
