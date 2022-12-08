import bookingReducer from '../Slice/bookingSlice'
import reducerCategory from '../Slice/categorySlice';
import reducerProduct from '../Slice/productSlice';
import cartSlice from '../Slice/cartSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    bookingReducer,
    reducerCategory,
    reducerProduct,
    cartSlice
  },
});
