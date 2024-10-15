import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMenuOpen: false,
};

export const mobileMenuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    openMenu: state => {
      state.isMenuOpen = true;
    },
    closeMenu: state => {
      state.isMenuOpen = false;
    },
  },
});

export const { openMenu, closeMenu } = mobileMenuSlice.actions;

export default mobileMenuSlice.reducer;
