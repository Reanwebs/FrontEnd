import {createSlice} from '@reduxjs/toolkit'




const initialState = {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
    token:null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
      setCredentials: (state, action) => {
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
       },
       removeCredentials: (state, action) => {
        state.userInfo = null;
        state.token = null
        localStorage.removeItem('userInfo');
      },
      setToken:(state,action)=>{
        state.token = action.payload
      }
    }
})

export const {setCredentials,removeCredentials,setToken} = authSlice.actions;

export default authSlice.reducer;