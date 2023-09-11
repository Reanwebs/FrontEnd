import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  joinId:null
};

const mediaSlice = createSlice({
  name: 'joinId',
  initialState,
  reducers: {
    setJoinId: (state, action) => {
      state.joinId = action.payload;
    },
  },
});

export const { setJoinId} = mediaSlice.actions;

export default mediaSlice.reducer;
