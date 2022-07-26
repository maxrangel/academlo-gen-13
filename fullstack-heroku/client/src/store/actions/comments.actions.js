import axios from 'axios';

import { postsActions } from '../slices/posts.slice';
import { errorActions } from '../slices/error.slice';

const API_URL = 'http://localhost:4000/api/v1/comments';

export const submitComment = (postId, comment) => {
	return async dispatch => {
		try {
			const token = localStorage.getItem('token');

			const res = await axios.post(
				API_URL,
				{ postId, comment },
				{
					headers: { authorization: `Bearer ${token}` },
				}
			);

			const { newComment } = res.data;

			dispatch(
				postsActions.newComment({
					postId,
					newComment: { id: newComment.id, comment },
				})
			);
		} catch (error) {
			dispatch(errorActions.setError({ error: error.response.data }));
		}
	};
};

export const deleteComment = (postId, commentId) => {
	return async dispatch => {
		try {
			const token = localStorage.getItem('token');

			await axios.delete(`${API_URL}/${commentId}`, {
				headers: { authorization: `Bearer ${token}` },
			});

			dispatch(postsActions.deleteComment({ postId, commentId }));
		} catch (error) {
			dispatch(errorActions.setError({ error: error.response.data }));
		}
	};
};
