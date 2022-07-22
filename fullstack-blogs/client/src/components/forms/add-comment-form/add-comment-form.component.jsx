import { Form, Input, message } from 'antd';
import { useDispatch } from 'react-redux';

import { submitComment } from '../../../store/actions/comments.actions';

// Components
import Button from '../../ui/button/button.component';

import classes from './add-comment-form.module.css';

const AddCommentForm = ({ postId }) => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();

	const submitHandler = e => {
		if (!e.comment) {
			return message.error('Invalid comment', 1.5);
		}

		dispatch(submitComment(postId, e.comment));
		form.resetFields();
	};

	return (
		<Form
			className={classes.form}
			layout='horizontal'
			form={form}
			name='commentForm'
			onFinish={submitHandler}
		>
			<Form.Item className={classes['form__item']} name='comment'>
				<Input placeholder='Your comment' />
			</Form.Item>

			<Form.Item>
				<Button type='submit' color='secondary' size='md'>
					Add
				</Button>
			</Form.Item>
		</Form>
	);
};

export default AddCommentForm;
