import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';

// Redux actions
import { getPosts } from '../../../store/actions/posts.actions';

// Components
import PostItem from '../post-item/post-item.component';

import classes from './post-list.module.css';

const PostsList = () => {
	const posts = useSelector(state => state.posts.posts);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	return (
		<div className={classes['post-list-container']}>
			<Row gutter={{ lg: 100 }} justify='space-around'>
				{posts &&
					posts.map(post => (
						<Col key={post.id} span={24}>
							<PostItem post={post} />
						</Col>
					))}
			</Row>
		</div>
	);
};

export default PostsList;
