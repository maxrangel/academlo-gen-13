import { useDispatch } from 'react-redux';
import { Form, Input, message } from 'antd';

// Redux actions
import { submitPost } from '../../../store/actions/posts.actions';

// Components
import Button from '../../ui/button/button.component';

import classes from './add-post-form.module.css';

const AddPostForm = () => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();

	const submitHandler = e => {
		if (!e.title || !e.content) {
			return message.error('Enter a valid title and content', 1.5);
		}

		dispatch(submitPost(e.title, e.content));

		form.resetFields();
	};

	return (
		<div className={classes['form-container']}>
			<h2>Create a new post now!</h2>
			<Form
				form={form}
				labelCol={{ span: 0 }}
				wrapperCol={{ span: 24 }}
				layout='vertical'
				name='newPost'
				size='middle'
				onFinish={submitHandler}
			>
				<Form.Item className={classes['form-item']} name='title'>
					<Input placeholder='Super title' />
				</Form.Item>

				<Form.Item
					labelCol={0}
					wrapperCol={24}
					className={classes['form-item']}
					name='content'
				>
					<Input.TextArea
						autoSize={{ minRows: 3, maxRows: 5 }}
						rows={4}
						placeholder='Enter your content'
					/>
				</Form.Item>

				<div className={classes.actions}>
					<Button size='block' color='primary' type='submit'>
						Post!
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default AddPostForm;
