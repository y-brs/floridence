import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import categorySlice from './slices/categorySlice';
import itemSlice from './slices/itemSlice';
import mobileMenuSlice from './slices/mobileMenuSlice';
import popupSlice from './slices/popupSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    menu: mobileMenuSlice,
    item: itemSlice,
    category: categorySlice,
    popup: popupSlice,
  },
});
