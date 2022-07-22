import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	error: null,
	showError: false,
};

const errorSlice = createSlice({
	initialState,
	name: 'error',
	reducers: {
		setError(state, action) {
			state.error = action.payload.error;
			state.showError = true;
		},
		dismissError(state) {
			state.error = null;
			state.showError = false;
		},
	},
});

export const errorActions = errorSlice.actions;
export default errorSlice.reducer;
