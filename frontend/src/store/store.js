import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../utils/apiSlice/apiSlice';
import authReducer from '../User/slices/reducers/user_reducers/authSlice'
import adminAuthReducer from '../Admin/slices/reducers/adminAuthSlice';
import streamReducer from '../User/slices/reducers/user_reducers/streamReducer';


const store = configureStore({
  reducer: {
    auth:authReducer,
    admin:adminAuthReducer,
    stream:streamReducer,
    [apiSlice.reducerPath]:apiSlice.reducer,
    },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
 
export default store;