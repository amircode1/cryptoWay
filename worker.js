// worker.js
self.addEventListener('message', async (event) => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${event.data}&sparkline=false`);
      const data = await response.json();
      self.postMessage({ type: 'update', data });
    } catch (error) {
      self.postMessage({ type: 'error', message: error.message });
    }
  });