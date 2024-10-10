import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { updateCartOnBitrix } from '../../hooks/updateCartOnBitrix';

const initialState = {
	isCartOpen: false,
	items: [],
	basketCount: 0,
	basketSum: 0,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		openCart: (state) => {
			state.isCartOpen = true;
		},
		closeCart: (state) => {
			state.isCartOpen = false;
		},
		addBasketCount(state, action) {
			state.basketCount = action.payload;
		},
		addBasketSum(state, action) {
			state.basketSum = action.payload;
		},
		addItem(state, action) {
			const findItem = state.items.find((obj) => obj.id === action.payload.id);
			if (findItem) {
				findItem.count = action.payload.count;
				findItem.price = action.payload.price;
			} else {
				state.items.push({
					...action.payload,
					count: action.payload.count,
				});
			}
		},

		minusItem(state, action) {
			const findItem = state.items.find((obj) => obj.id === action.payload.id);

			if (findItem) {
				findItem.count = action.payload.count;
			}
		},
		removeItem(state, action) {
			state.items = state.items.filter((obj) => obj.id !== action.payload.id);
		},
	},
});

export const {
	addBasketCount,
	addBasketSum,
	openCart,
	closeCart,
	addItem,
	addItemFirstRender,
	minusItem,
	removeItem,
} = cartSlice.actions;

export default cartSlice.reducer;
