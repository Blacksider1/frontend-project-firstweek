
import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from '../Slice/bookingSlice'
import cartSlice from '../Slice/cartSlice';
import categoryReducer from '../Slice/categorySlice';
import productSlice from '../Slice/productSlice';
import registration from '../Slice/registrationSlice'


export const store = configureStore({
  reducer: {
    bookingReducer,
    cartSlice,
    categoryReducer,
    productSlice,
    registration
  },
});
