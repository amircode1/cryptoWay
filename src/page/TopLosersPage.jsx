import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import CoinTable from '../components/CoinTable';
import PaginationControlled from '../components/Pagination';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function TopLosersPage() {
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const fetchCoinsData = async (page) => {
    try {
      const { data } = await axiosInstance.get('/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 100,
          page: page,
          sparkline: true,
          accept: 'application/json',
        },
      });
      if (!data || data.length === 0) {
        throw new Error('No data returned from API');
      }
      return data;
    } catch (error) {
      console.error('Error fetching coins data:', error.message);
      throw error;
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['coins', page],
    queryFn: () => fetchCoinsData(page),
    staleTime: 60000,
    cacheTime: 300000,
    enabled: !!page,
    retry: 2,
  });

  const TopLoser = data ? data.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h) : [];

  if (isLoading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  if (isError) {
    return (
      <Modal isOpen={isErrorModalOpen} onClose={() => setIsErrorModalOpen(false)}>
        <h2>Error:</h2>
        <p>{error?.message || 'An unknown error occurred.'}</p>
      </Modal>
    );
  }

  return (
    <div className="flex justify-start items-center flex-col min-w-7xl">
      <Navbar />
      <div className="w-full max-w-7xl mt-3 border-b-2 border-emerald-300">
        {isLoading ? (
          <>
            <Skeleton height={40} className="mb-4" />
            <Skeleton count={2} className="mb-2" />
          </>
        ) : (
          <>
            <h1 className="text-2xl md:text-3xl font-bold text-start p-4">Top Losers</h1>
            <p className='text-sm md:text-base text-start p-4 pb-2 font-semibold text-gray-500'>
              Cryptocurrencies with the lowest daily percentage change in price over the last 24 hours.
            </p>
          </>
        )}
      </div>

      <div className='flex flex-row flex-wrap gap-2 md:gap-4 justify-start items-start m-2 w-full'>
        <Link to={'/category'} className="text-sm md:text-base text-emerald-600 hover:text-emerald-700 hover:bg-emerald-200 p-2 font-sans font-bold rounded transition duration-200 ease-in-out transform hover:scale-105">
          Category
        </Link>
        <Link to={'/top-losers'} className="text-sm md:text-base text-emerald-600 hover:text-emerald-700 hover:bg-emerald-200 p-2 font-sans font-bold rounded transition duration-200 ease-in-out transform hover:scale-105">
          Top Losers
        </Link>
        <Link to={'/top-gainers'} className="text-sm md:text-base text-emerald-600 hover:text-emerald-700 hover:bg-emerald-200 p-2 font-sans font-bold rounded transition duration-200 ease-in-out transform hover:scale-105">
          Top Gainers
        </Link>
      </div>

      {isLoading ? (
        <div className="w-full max-w-7xl">
          <Skeleton count={10} height={50} className="mb-2" />
        </div>
      ) : (
        <div className="w-full max-w-7xl flex flex-col">
          <CoinTable coins={TopLoser} />
          <PaginationControlled page={page} setPage={setPage} />
        </div>
      )}

      <Footer />

      {isErrorModalOpen && (
        <Modal isOpen={isErrorModalOpen} onClose={() => setIsErrorModalOpen(false)}>
          <h2>Error:</h2>
          <p>{error?.message || 'An unknown error occurred.'}</p>
        </Modal>
      )}
    </div>
  );
}

export default TopLosersPage;
