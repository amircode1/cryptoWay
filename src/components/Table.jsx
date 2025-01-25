import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import PaginationControlled from "./Pagination";
import { BiStar } from "react-icons/bi";
import { useSelector, useDispatch } from 'react-redux';
import { addToWatchlist } from '../features/watchListSlice';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const fetchCoinsData = async (page) => {
  const { data } = await axiosInstance.get('coins/markets', {
    params: {
      vs_currency: 'usd',
      page: page,
      per_page: 100,
      sparkline: true,
      accept: 'application/json',
    }
  });
  return data;
};

function CryptoTable() {
  const watchlist = useSelector((state) => state.watchlist);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [notification, setNotification] = useState('');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['coins', page],
    queryFn: () => fetchCoinsData(page),
    enabled: !!page,
  });

  const addToWatchlistHandler = (coin) => {
    if (!watchlist.some((watch) => watch.id === coin.id)) {
      dispatch(addToWatchlist(coin));
      setNotification(`${coin.name} added to Watchlist!`);
    } else {
      setNotification(`${coin.name} is already in Watchlist!`);
    }
    setTimeout(() => setNotification(''), 3000);
  };

  const isInWatchlist = (coinId) => {
    return watchlist.some(watch => watch.id === coinId);
  };

  if (isError) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto overflow-x-auto bg-slate-50 p-2 sm:p-4">
      {notification && (
        <div className="bg-green-500 text-white p-3 rounded-lg mb-4 text-center">
          {notification}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full text-xs sm:text-sm md:text-base text-left text-gray-700">
          <thead className="bg-emerald-500 text-gray-50 uppercase font-semibold">
            <tr>
              <th className="px-2 sm:px-4 pr-0 py-2">#</th>
              <th className="py-2"></th>
              <th className="px-2 sm:px-4 py-2">Coin</th>
              <th className="px-2 sm:px-4 py-2">Price</th>
              <th className="px-2 sm:px-4 py-2">24h Change</th>
              <th className="px-2 sm:px-4 py-2">24h Volume</th>
              <th className="px-2 sm:px-4 py-2">Market Cap</th>
              <th className="px-2 sm:px-4 py-2">Last 7 Days</th>
            </tr>
          </thead>
          <tbody className="font-sans">
            {isLoading ? (
              [...Array(10)].map((_, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="px-2 sm:px-4 py-3"><Skeleton /></td>
                  <td className="py-3"><Skeleton /></td>
                  <td className="px-2 sm:px-4 py-3">
                    <div className="flex items-center">
                      <Skeleton circle width={24} height={24} />
                      <Skeleton width={100} className="ml-2" />
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 py-3"><Skeleton /></td>
                  <td className="px-2 sm:px-4 py-3"><Skeleton /></td>
                  <td className="px-2 sm:px-4 py-3"><Skeleton /></td>
                  <td className="px-2 sm:px-4 py-3"><Skeleton /></td>
                  <td className="px-2 sm:px-4 py-3"><Skeleton width={100} height={50} /></td>
                </tr>
              ))
            ) : (
              data && data.map((coin, index) => (
                <tr key={coin.id} className="border-b border-gray-300 hover:bg-green-100">
                  <td className="px-2 sm:px-4 pr-0 py-3 font-semibold text-gray-900">
                    {(page - 1) * 100 + index + 1}
                  </td>
                  <td className="py-3 text-gray-900">
                    <button 
                      onClick={() => addToWatchlistHandler(coin)} 
                      className={`text-xl hover:text-green-400 ${isInWatchlist(coin.id) ? 'text-green-500' : 'text-gray-500'}`}
                    >
                      <BiStar />
                    </button>
                  </td>
                  <td className="px-2 sm:px-4 py-5 flex justify-start items-center">
                    <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
                    <Link 
                      to={`/${coin.id}`}
                      className="font-semibold text-gray-900 p-2 hover:text-green-600"
                    >
                      {coin.name}
                    </Link>
                    <span className="text-gray-500 text-xs">{coin.symbol.toUpperCase()}</span>
                  </td>
                  <td className="px-2 sm:px-4 py-3 text-gray-900">
                    ${coin.current_price.toLocaleString()}
                  </td>
                  <td className={`px-2 sm:px-4 py-3 ${coin.price_change_percentage_24h < 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                    {coin.price_change_percentage_24h !== null 
                      ? `${coin.price_change_percentage_24h.toFixed(2)}%` 
                      : 'N/A'}
                  </td>
                  <td className="px-2 sm:px-4 py-3 text-gray-900">
                    ${coin.total_volume.toLocaleString()}
                  </td>
                  <td className="px-2 sm:px-4 py-3 text-gray-900">
                    ${coin.market_cap.toLocaleString()}
                  </td>
                  <td className="px-2 sm:px-4 py-3">
                    {coin.sparkline_in_7d && coin.sparkline_in_7d.price && (
                      <div style={{ width: "100px", height: "50px" }}>
                        <svg width="100" height="50">
                          <polyline
                            fill="none"
                            stroke={coin.price_change_percentage_7d_in_currency > 0 ? "#16a34a" : "#dc2626"}
                            strokeWidth="2"
                            points={coin.sparkline_in_7d.price
                              .map((price, i) =>
                                `${i * (100 / coin.sparkline_in_7d.price.length)},${50 - ((price - Math.min(...coin.sparkline_in_7d.price)) / (Math.max(...coin.sparkline_in_7d.price) - Math.min(...coin.sparkline_in_7d.price))) * 50}` 
                              )
                              .join(" ")}
                          />
                        </svg>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <PaginationControlled page={page} setPage={setPage} />
    </div>
  );
}

export default CryptoTable;
