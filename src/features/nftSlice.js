import { createSlice } from '@reduxjs/toolkit';

const nftsSlice = createSlice({
  name: 'nfts',
  initialState: [],
  reducers: {
    addToNftList: (state, action) => {
      if (!state.some((item) => item.id === action.payload.id)) {
        state.push(action.payload);
      }
    },
    removeFromNftList: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addToNftList, removeFromNftList } = nftsSlice.actions;
export default nftsSlice.reducer;
