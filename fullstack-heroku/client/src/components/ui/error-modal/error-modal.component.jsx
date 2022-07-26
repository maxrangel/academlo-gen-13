import { Modal } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { dismissError } from '../../../store/actions/error.actions';

const ErrorModal = () => {
	// State
	const error = useSelector(state => state.error.error);
	const showError = useSelector(state => state.error.showError);

	const dispatch = useDispatch();

	const dismissModalHandler = () => {
		dispatch(dismissError());
	};

	return (
		error && (
			<Modal
				title='Error'
				visible={showError}
				onOk={dismissModalHandler}
				onCancel={dismissModalHandler}
			>
				<p>{error.message}</p>
			</Modal>
		)
	);
};

export default ErrorModal;
