import { Fragment } from 'react';

// Components
import CommentItem from '../comment-item/comment-item.component';
import AddCommentForm from '../../forms/add-comment-form/add-comment-form.component';

const PostComments = ({ postId, comments }) => {
	return (
		<Fragment>
			<AddCommentForm postId={postId} />
			{comments.length === 0 && <p>No comments...</p>}

			{comments.length > 0 &&
				comments.map(comment => (
					<CommentItem key={comment.id} postId={postId} comment={comment} />
				))}
		</Fragment>
	);
};

export default PostComments;
