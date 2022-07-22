import { errorActions } from '../slices/error.slice';

export const setError = err => {
	return async dispatch => {
		dispatch(errorActions.setError(err));
	};
};

export const dismissError = err => {
	return async dispatch => {
		dispatch(errorActions.dismissError());
	};
};
