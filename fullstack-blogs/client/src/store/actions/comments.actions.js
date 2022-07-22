import axios from 'axios';

import { postsActions } from '../slices/posts.slice';
import { errorActions } from '../slices/error.slice';

const API_URL = '';

export const submitComment = (postId, comment) => {
	return async dispatch => {
		try {
			dispatch(postsActions.newComment({ postId, newComment: { comment } }));
		} catch (error) {
			dispatch(errorActions.setError({ error: error.response.data }));
		}
	};
};

export const deleteComment = (postId, commentId) => {
	return async dispatch => {
		try {
			dispatch(postsActions.deleteComment({ postId, commentId }));
		} catch (error) {
			dispatch(errorActions.setError({ error: error.response.data }));
		}
	};
};
