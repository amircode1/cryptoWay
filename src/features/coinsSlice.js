import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

export const fetchCoins = createAsyncThunk(
  'coins/fetchCoins',
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get('/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 100,
          page: page,
          sparkline: true,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const coinsSlice = createSlice({
  name: 'coins',
  initialState: {
    data: [],
    loading: 'idle',
    error: null,
  },
  reducers: {
    updateCoinPrices: (state, action) => {
      action.payload.forEach(updatedCoin => {
        const index = state.data.findIndex(coin => coin.id === updatedCoin.id);
        if (index !== -1) {
          state.data[index] = { ...state.data[index], ...updatedCoin };
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.data = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      });
  },
});

export const { updateCoinPrices } = coinsSlice.actions;
export default coinsSlice.reducer;