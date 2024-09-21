import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	counter: 0,
	items: [],
	promoItems: [],
	waitForResponse: false,
};

export const itemSlice = createSlice({
	name: 'item',
	initialState,
	reducers: {
		increment: (state) => {
			state.counter += 1;
		},
		addHomeItem(state, action) {
			state.items.push({
				...action.payload,
				count: action.payload.count,
			});
		},
		addPromoItem(state, action) {
			state.promoItems.push({
				...action.payload,
				count: action.payload.count,
			});
		},
		setWaitForResponse(state, action) {
			state.waitForResponse = action.payload;
		},
	},
});

export const { increment, addHomeItem, addPromoItem, setWaitForResponse } = itemSlice.actions;

export default itemSlice.reducer;
