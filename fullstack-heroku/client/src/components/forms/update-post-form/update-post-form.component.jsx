import { Form, Input } from 'antd';
import { useDispatch } from 'react-redux';

// Redux actions
import { updatePost } from '../../../store/actions/posts.actions';

// Components
import Button from '../../ui/button/button.component';

const UpdatePostForm = ({ id, title, content, onHideUpdateForm }) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();

	const onCancel = () => {
		onHideUpdateForm();
	};

	const onSubmitHandler = e => {
		console.log(e);
		dispatch(updatePost(id, e.title, e.content));
		onHideUpdateForm();
	};

	return (
		<Form form={form} name='updatePostForm' onFinish={onSubmitHandler}>
			<Form.Item initialValue={title} name='title'>
				<Input placeholder={title} />
			</Form.Item>
			<Form.Item initialValue={content} name='content'>
				<Input placeholder={content} />
			</Form.Item>

			<div className='actions'>
				<Button onClick={onCancel} type='button' color='tertiary' size='sm'>
					Cancel
				</Button>
				<Button type='submit' color='tertiary' size='sm'>
					Update
				</Button>
			</div>
		</Form>
	);
};

export default UpdatePostForm;
