import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	show: false,
	isDelete: false,
	name: '',
};

export const popupSlice = createSlice({
	name: 'popup',
	initialState,
	reducers: {
		setName(state, action) {
			state.name = action.payload;
		},
		setShow(state) {
			state.show = true;
		},
		hidePopup(state) {
			state.show = false;
		},
		setIsDelete(state, action) {
			state.isDelete = action.payload;
		},
	},
});

export const { setName, setShow, hidePopup, setIsDelete } = popupSlice.actions;

export default popupSlice.reducer;
