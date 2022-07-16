const express = require('express');

// Controller
const {
	getAllComments,
	createComment,
	getCommentById,
	updateComment,
	deleteComment,
} = require('../controllers/comments.controller');

// Middlewares
const { commentExists } = require('../middlewares/comments.middleware');
const { protectSession } = require('../middlewares/auth.middleware');

const commentsRouter = express.Router();

commentsRouter.use(protectSession);

commentsRouter.route('/').get(getAllComments).post(createComment);

commentsRouter
	.use('/:id', commentExists)
	.route('/:id')
	.get(getCommentById)
	.patch(updateComment)
	.delete(deleteComment);

module.exports = { commentsRouter };
