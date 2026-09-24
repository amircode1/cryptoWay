// store.js
import { configureStore } from '@reduxjs/toolkit';
import watchlistReducer from '../features/watchListSlice';
import nftsReducer from '../features/nftSlice';
import localStorageMiddleware from '../features/localStorageMiddleware';

// Hydrate watchlist / NFTs from localStorage so saved items survive reloads.
const readSaved = (key) => {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const store = configureStore({
  reducer: {
    watchlist: watchlistReducer,
    nfts: nftsReducer,
  },
  preloadedState: {
    watchlist: readSaved('watchlist'),
    nfts: readSaved('nfts'),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
