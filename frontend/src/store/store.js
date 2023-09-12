import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../utils/apiSlice/apiSlice';
import authReducer from '../User/slices/reducers/user_reducers/authSlice'
import adminAuthReducer from '../Admin/slices/reducers/adminAuthSlice';
import mediaReducer from '../User/slices/reducers/user_reducers/mediaReducer';


const store = configureStore({
  reducer: {
    auth:authReducer,
    admin:adminAuthReducer,
    joinId:mediaReducer,
    [apiSlice.reducerPath]:apiSlice.reducer,
    },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
 
export default store;