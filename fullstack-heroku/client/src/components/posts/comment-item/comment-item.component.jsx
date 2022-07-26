import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../../../store/actions/comments.actions';

import classes from './comment-item.module.css';

const CommentItem = ({ postId, comment }) => {
	const dispatch = useDispatch();

	const onDeleteComment = () => {
		console.log('delete');
		dispatch(deleteComment(postId, comment.id));
	};

	return (
		<div className={classes.comment}>
			<DeleteOutlined
				size='md'
				key={`delete-${comment.id}`}
				onClick={onDeleteComment}
				style={{ color: '#f85555' }}
			/>
			<p>{comment.comment}</p>
		</div>
	);
};

export default CommentItem;
