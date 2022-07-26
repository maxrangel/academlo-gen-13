import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Collapse, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

// Redux actions
import { deletePost } from '../../../store/actions/posts.actions';

// Components
import PostComments from '../post-comments/post-comments.component';
import UpdatePostForm from '../../forms/update-post-form/update-post-form.component';

import classes from './post-item.module.css';

const PostItem = ({ post }) => {
	const user = useSelector(state => state.user.user);
	const dispatch = useDispatch();

	// State
	const [showEditForm, setShowEditForm] = useState(false);

	const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	});

	const onEditHandler = () => {
		setShowEditForm(true);
	};

	const onDeleteHandler = () => {
		dispatch(deletePost(post.id));
	};

	return (
		user && (
			<Card
				actions={
					post.userId === user.id && [
						<EditOutlined onClick={onEditHandler} key='edit' />,
						<DeleteOutlined
							onClick={onDeleteHandler}
							style={{ color: '#f85555' }}
							key='delete'
						/>,
					]
				}
				headStyle={{
					background: '#97dddf',
					color: '#114070',
					fontWeight: 'bold',
				}}
				title={post.user.name}
				extra={formattedDate}
				hoverable
				className={classes.card}
			>
				{!showEditForm ? (
					<Row>
						<Col span={20}>
							<Card.Meta title={post.title} />
							<p>{post.content}</p>
						</Col>
						<Col span={4}>
							<Link to={`/profile/${post.userId}`}>View profile</Link>
						</Col>
					</Row>
				) : (
					<UpdatePostForm
						id={post.id}
						title={post.title}
						content={post.content}
						onHideUpdateForm={() => setShowEditForm(false)}
					/>
				)}

				<Collapse ghost>
					<Collapse.Panel
						header={`View ${post.comments.length} comments`}
						key='1'
					>
						<PostComments postId={post.id} comments={post.comments} />
					</Collapse.Panel>
				</Collapse>
			</Card>
		)
	);
};

export default PostItem;
