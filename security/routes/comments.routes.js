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

const commentsRouter = express.Router();

commentsRouter.get('/', getAllComments);

commentsRouter.post('/', createComment);

commentsRouter.get('/:id', commentExists, getCommentById);

commentsRouter.patch('/:id', commentExists, updateComment);

commentsRouter.delete('/:id', commentExists, deleteComment);

module.exports = { commentsRouter };
