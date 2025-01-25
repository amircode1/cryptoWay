const localStorageMiddleware = (store) => (next) => (action) => {
    const result = next(action);
  
    const state = store.getState();
    localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
    localStorage.setItem('nfts', JSON.stringify(state.nfts));
  
    return result;
  };
  
  export default localStorageMiddleware;