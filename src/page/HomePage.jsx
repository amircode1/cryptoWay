import React, { useState, useEffect, useMemo } from 'react';
import CryptoTable from '../components/Table';
import Navbar from '../components/Navbar';
import MarketCapCard from '../components/MarketCapCard';
import NewsCards from '../components/NewsCard';
import Footer from '../components/Footer';
import CardTrending from '../components/CardTrending';
import { useCoinsListQuery, useMarketCapQuery, useTrendingCoinsQuery } from '../queries/useQuery';
import Modal from '../components/Modal';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function HomePage() {
  const [page, setPage] = useState(1);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const { data: coinsData = [], isLoading: coinsLoading } = useCoinsListQuery(page);
  const { data: marketCapData = [], isLoading: marketCapLoading, isError: marketCapError, error: marketCapErr } = useMarketCapQuery();
  const { data: trendingCoinsData = { coins: [] }, isLoading: trendingLoading, isError: trendingError, error: trendingErr } = useTrendingCoinsQuery();

  const topGainers = useMemo(() => {
    return [...trendingCoinsData.coins].sort((a, b) =>
      (b.item.data.price_change_percentage_24h.usd || 0) - (a.item.data.price_change_percentage_24h.usd || 0)
    ).slice(0, 5);
  }, [trendingCoinsData]);

  const isLoading = marketCapLoading || trendingLoading || coinsLoading;
  const isError = marketCapError || trendingError;

  // Collect error messages
  const errorMessages = [];
  if (marketCapError) errorMessages.push(marketCapErr?.message);
  if (trendingError) errorMessages.push(trendingErr?.message);

  // Use useEffect to handle modal opening
  useEffect(() => {
    if (isError) {
      setIsErrorModalOpen(true);
    }
  }, [isError]);

  if (isLoading) return (
    <div className="w-full max-w-7xl mx-auto">
      <Navbar />
      <div className="w-full">
        <Skeleton count={10} height={50} className="mb-2" />
      </div>
      <Footer />
    </div>
  );

  return (
    <div className='bg-slate-50 flex justify-start items-center flex-col min-w-full px-4 md:px-0'>
      <Navbar />
      <div className='w-full max-w-7xl my-3'>
        {isLoading ? (
          <Skeleton height={40} className="mb-4" />
        ) : (
          <h1 className='text-2xl md:text-3xl font-bold text-start p-4 inline'>Today's Cryptocurrency Prices by Market Cap</h1>
        )}
      </div>
      
      <div className='w-full max-w-7xl flex flex-col md:flex-row gap-4 md:gap-10 p-4 pt-2'>
        {isLoading ? (
          <>
            <div className="w-full md:w-1/3">
              <Skeleton height={200} className="mb-4" />
            </div>
            <div className="w-full md:w-1/3">
              <Skeleton height={200} className="mb-4" />
            </div>
            <div className="w-full md:w-1/3">
              <Skeleton height={200} className="mb-4" />
            </div>
          </>
        ) : (
          <>
            <CardTrending 
              title="Trending Coins" 
              coins={trendingCoinsData.coins.slice(0, 5)} 
            />
            <CardTrending 
              title="Top Gainers" 
              coins={topGainers.slice(0, 5)} 
            />
            <div className='flex flex-col gap-4 w-full md:w-auto'>
              <MarketCapCard
                data={marketCapData.slice(0, 10)}
                label="Top 10 Market Cap"
                color="rgba(16, 185, 129, 1)"
              />
              <MarketCapCard
                data={marketCapData.slice(10, 20)}
                label="Next 10 Market Cap"
                color="rgba(59, 130, 246, 1)"
              />
            </div>
            <NewsCards />
          </>
        )}
      </div>

      <hr className='max-w-7xl w-full border-t-2 border-emerald-300 m-5 mt-1' />

      {isLoading ? (
        <div className="w-full max-w-7xl">
          <Skeleton count={10} height={50} className="mb-2" />
        </div>
      ) : (
        <CryptoTable
          coins={coinsData}
          loading={coinsLoading ? "loading" : "loaded"}
          page={page}
          setPage={setPage}
        />
      )}

      <Footer />
      
      {isErrorModalOpen && (
        <Modal isOpen={isErrorModalOpen} onClose={() => setIsErrorModalOpen(false)}>
          <h2>Error:</h2>
          <ul>
            {errorMessages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
}

export default HomePage;