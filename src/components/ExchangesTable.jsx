import React, { useState } from 'react';
import { useExchangesQuery } from '../queries/useQuery';
import PaginationControlled from './Pagination';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function ExchangesTable() {
  const [page, setPage] = useState(1);
  const { data, isError, isLoading, error } = useExchangesQuery(page);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full text-gray-700">
        <div className="animate-pulse flex flex-col w-full">
          {[...Array(10)].map((_, index) => (
            <Skeleton key={index} height={40} className="mb-2" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 flex justify-center items-center h-full">
        <p>Error: {error?.message || 'An unknown error occurred.'}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-gray-500 flex justify-center items-center h-full">
        <p>No exchanges data available.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-emerald-500 text-gray-50 uppercase font-semibold">
            <tr>
              <th className="p-2 text-center">#</th>
              <th className="p-2 px-4">Name</th>
              <th className="p-2 text-center">Year Established</th>
              <th className="p-2 text-center">Country</th>
              <th className="p-2 text-center">Trust Score</th>
              <th className="p-2 text-center">24h Volume (BTC)</th>
              <th className="p-2 text-center">Website</th>
            </tr>
          </thead>
          <tbody className="font-sans">
            {data.map((exchange) => (
              <tr key={exchange.id} className="border-b border-gray-300 hover:bg-green-100">
                <td className="px-4 py-3 text-center">{exchange.trust_score_rank}</td>
                <td className="px-4 py-3 flex items-center">
                  {exchange.image && (
                    <img
                      src={exchange.image}
                      alt={exchange.name}
                      className="w-6 h-6 rounded-full"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder.png';
                      }}
                    />
                  )}
                  <span className="font-semibold text-gray-900 p-2">{exchange.name}</span>
                </td>
                <td className="px-4 py-3 text-center">{exchange.year_established || 'N/A'}</td>
                <td className="px-4 py-3 text-center">{exchange.country || 'N/A'}</td>
                <td className="px-4 py-3 text-center">
                  <span className="bg-emerald-300 px-2 py-1 rounded-md">
                    {exchange.trust_score}/10
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  {typeof exchange.trade_volume_24h_btc === 'number'
                    ? exchange.trade_volume_24h_btc.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : 'N/A'}
                </td>
                <td className="px-4 py-3 text-center">
                  <a
                    href={exchange.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-500 hover:text-emerald-600 transition-colors duration-200"
                  >
                    Visit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <PaginationControlled page={page} setPage={setPage} />
        </div>
      </div>
    </div>
  );
}

export default ExchangesTable;
