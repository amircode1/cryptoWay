import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CardCoin from '../components/CardCoin';
import CardNft from '../components/CardNft';
import { useSelector, useDispatch } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../features/watchListSlice';
import { addToNftList, removeFromNftList } from '../features/nftSlice';
import { useMarketCapQuery } from '../queries/useQuery';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function WatchlistPage() {
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlist);
  const nfts = useSelector((state) => state.nfts);
  const [showNfts, setShowNfts] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const { data: coins = [], isLoading, isError } = useMarketCapQuery();

  // Load saved data from localStorage on component mount
  useEffect(() => {
    try {
      const savedWatchlist = localStorage.getItem('watchlist');
      const savedNfts = localStorage.getItem('nfts');
      
      if (savedWatchlist) {
        dispatch({ type: 'watchlist/loadState', payload: JSON.parse(savedWatchlist) });
      }
      if (savedNfts) {
        dispatch({ type: 'nfts/loadState', payload: JSON.parse(savedNfts) });
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, [dispatch]);

  // Save to localStorage whenever watchlist or nfts change
  useEffect(() => {
    try {
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      localStorage.setItem('nfts', JSON.stringify(nfts));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [watchlist, nfts]);

  const handleRemoveFromWatchlist = (coin) => {
    dispatch(removeFromWatchlist(coin));
    showNotificationMessage('Coin removed from watchlist');
  };

  const handleRemoveFromNftList = (nft) => {
    dispatch(removeFromNftList(nft));
    showNotificationMessage('NFT removed from watchlist');
  };

  const showNotificationMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  if (isError) {
    return (
      <div className="w-full max-w-7xl mx-auto">
        <Navbar />
        <div className="text-center text-red-500 p-4">
          Error loading data. Please try again later.
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Navbar />
      <div className="border-b-2 border-emerald-300 p-4">
        {isLoading ? (
          <>
            <Skeleton height={40} className="mb-4" />
            <Skeleton count={2} className="mb-2" />
          </>
        ) : (
          <>
            <h1 className="text-2xl md:text-3xl font-bold p-4">Watchlist</h1>
            <p className="text-sm md:text-base text-gray-500 px-4 pb-4 font-semibold">
              Track your favorite cryptocurrencies and NFTs in one place.
            </p>
          </>
        )}

        {showNotification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white p-3 rounded-lg shadow-lg z-50">
            {notificationMessage}
          </div>
        )}

        <div className="flex justify-start mb-6 gap-4">
          <button
            onClick={() => setShowNfts(false)}
            className={`px-4 py-2 rounded-full transition-colors duration-300 ${
              !showNfts ? 'bg-emerald-500 text-white' : 'bg-gray-200'
            }`}
          >
            Coins
          </button>
          <button
            onClick={() => setShowNfts(true)}
            className={`px-4 py-2 rounded-full transition-colors duration-300 ${
              showNfts ? 'bg-emerald-500 text-white' : 'bg-gray-200'
            }`}
          >
            NFTs
          </button>
        </div>

        {showNfts ? (
          // NFT Watchlist Section
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              [...Array(6)].map((_, index) => (
                <Skeleton key={index} height={200} className="mb-4" />
              ))
            ) : nfts.length > 0 ? (
              nfts.map((nft) => (
                <div key={nft.id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  <CardNft nft={nft} />
                  <button
                    onClick={() => handleRemoveFromNftList(nft)}
                    className="mt-4 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors duration-300"
                  >
                    Remove from NFT Watchlist
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500 py-8">
                No NFTs in your watchlist
              </div>
            )}
          </div>
        ) : (
          // Coin Watchlist Section
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              [...Array(6)].map((_, index) => (
                <Skeleton key={index} height={200} className="mb-4" />
              ))
            ) : watchlist.length > 0 ? (
              watchlist.map((coin) => (
                <div key={coin.id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  <CardCoin coin={coin} />
                  <button
                    onClick={() => handleRemoveFromWatchlist(coin)}
                    className="mt-4 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors duration-300"
                  >
                    Remove from Coin Watchlist
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500 py-8">
                No coins in your watchlist
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default WatchlistPage;
