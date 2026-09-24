import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CardCoin from '../components/CardCoin';
import CardNft from '../components/CardNft';
import Toast from '../components/ui/Toast';
import Card from '../components/ui/Card';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWatchlist } from '../features/watchListSlice';
import { removeFromNftList } from '../features/nftSlice';

function WatchlistPage() {
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlist);
  const nfts = useSelector((state) => state.nfts);
  const [showNfts, setShowNfts] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotificationMessage = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRemoveFromWatchlist = (coin) => {
    dispatch(removeFromWatchlist(coin));
    showNotificationMessage(`${coin.name} removed from watchlist`);
  };

  const handleRemoveFromNftList = (nft) => {
    dispatch(removeFromNftList(nft));
    showNotificationMessage(`${nft.name} removed from watchlist`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <Toast message={notification} />

      <main className="w-full max-w-7xl mx-auto px-4 md:px-0 flex-1 fade-in-up">
        <div className="border-b-2 border-emerald-300 p-4">
          <h1 className="text-2xl md:text-3xl font-bold p-4 pb-2 font-display">Watchlist</h1>
          <p className="text-sm md:text-base text-gray-500 px-4 pb-4 font-semibold">
            Track your favorite cryptocurrencies and NFTs in one place.
          </p>

          <div className="flex justify-start mb-6 gap-4 px-4">
            <button
              onClick={() => setShowNfts(false)}
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                !showNfts ? 'bg-emerald-500 text-white' : 'bg-gray-200 hover:bg-emerald-100'
              }`}
            >
              Coins
            </button>
            <button
              onClick={() => setShowNfts(true)}
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                showNfts ? 'bg-emerald-500 text-white' : 'bg-gray-200 hover:bg-emerald-100'
              }`}
            >
              NFTs
            </button>
          </div>

          {showNfts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
              {nfts.length > 0 ? (
                nfts.map((nft) => (
                  <Card key={nft.id} hover className="p-4 flex flex-col gap-4">
                    <CardNft nft={nft} />
                    <button
                      onClick={() => handleRemoveFromNftList(nft)}
                      className="w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
                    >
                      Remove from NFT Watchlist
                    </button>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-8">
                  No NFTs in your watchlist
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
              {watchlist.length > 0 ? (
                watchlist.map((coin) => (
                  <Card key={coin.id} hover className="p-4 flex flex-col gap-4">
                    <CardCoin coin={coin} />
                    <button
                      onClick={() => handleRemoveFromWatchlist(coin)}
                      className="w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
                    >
                      Remove from Coin Watchlist
                    </button>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-8">
                  No coins in your watchlist
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default WatchlistPage;
