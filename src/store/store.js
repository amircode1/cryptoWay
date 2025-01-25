// store.js
import { configureStore } from '@reduxjs/toolkit';
import  coinsReducer from '../features/coinsSlice';
import watchlistReducer from '../features/watchListSlice';
import nftsReducer from '../features/nftSlice';
import localStorageMiddleware from '../features/localStorageMiddleware';

const store = configureStore({
  reducer: {
    coins: coinsReducer,
    watchlist: watchlistReducer,
    nfts: nftsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
