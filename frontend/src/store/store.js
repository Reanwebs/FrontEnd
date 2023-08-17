import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../slices/api_slices/apiSlice';
import authReducer from '../slices/reducers/user_reducers/authSlice'


const store = configureStore({
  reducer: {
    auth:authReducer,
    [apiSlice.reducerPath]:apiSlice.reducer,
    },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
 
export default store;