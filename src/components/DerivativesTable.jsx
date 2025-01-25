import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import PaginationControlled from './Pagination';

function DerivativesTable({ data, page, setPage }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading with a timeout
    const timer = setTimeout(() => setLoading(false), 2000); // Adjust time as necessary
    return () => clearTimeout(timer);
  }, []);

  const tableData = Array.isArray(data) ? data : [];

  if (loading) {
    // Skeleton loader for the table
    return (
      <div className="w-full max-w-7xl mx-auto overflow-x-auto rounded">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-emerald-500 text-gray-50 uppercase font-semibold">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Year Established</th>
              <th className="px-4 py-2 text-center">Country</th>
              <th className="px-4 py-2">Open Interest (BTC)</th>
              <th className="px-4 py-2">24h Volume (BTC)</th>
              <th className="px-4 py-2">Website</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, idx) => (
              <tr key={idx} className="border-b border-gray-300">
                <td className="px-4 py-3 text-center">
                  <Skeleton width={30} height={20} />
                </td>
                <td className="px-4 py-3 flex items-center">
                  <Skeleton circle width={24} height={24} />
                  <Skeleton width={120} height={20} className="ml-2" />
                </td>
                <td className="px-4 py-3 text-center">
                  <Skeleton width={100} height={20} />
                </td>
                <td className="px-4 py-3 text-center">
                  <Skeleton width={100} height={20} />
                </td>
                <td className="px-4 py-3 text-center">
                  <Skeleton width={80} height={20} />
                </td>
                <td className="px-4 py-3 text-center">
                  <Skeleton width={80} height={20} />
                </td>
                <td className="px-4 py-3 text-center">
                  <Skeleton width={80} height={20} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (tableData.length === 0) {
    return (
      <div className="text-center text-gray-700">
        No data available
        <PaginationControlled page={page} setPage={setPage} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto overflow-x-auto rounded">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-emerald-500 text-gray-50 uppercase font-semibold">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Year Established</th>
            <th className="px-4 py-2 text-center">Country</th>
            <th className="px-4 py-2">Open Interest (BTC)</th>
            <th className="px-4 py-2">24h Volume (BTC)</th>
            <th className="px-4 py-2">Website</th>
          </tr>
        </thead>
        <tbody className='font-sans'>
          {tableData.map((exchange, index) => (
            <tr key={exchange.id} className="border-b border-gray-300 hover:bg-green-100">
              <td className="px-4 py-3 text-center">{(page - 1) * 10 + index + 1}</td>
              <td className="px-4 py-3 flex items-center">
                <img
                  src={exchange.image}
                  alt={exchange.name}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <span>{exchange.name}</span>
              </td>
              <td className="px-4 py-3 text-center">{exchange.year_established || 'N/A'}</td>
              <td className="px-4 py-3 text-center">{exchange.country || 'N/A'}</td>
              <td className="px-4 py-3 text-center">
                {(exchange.open_interest_btc ?? 0).toLocaleString()} BTC
              </td>
              <td className="px-4 py-3 text-center">
                {parseFloat(exchange.trade_volume_24h_btc ?? 0).toLocaleString()} BTC
              </td>
              <td className="px-4 py-3 text-center">
                <a
                  href={exchange.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-500 hover:underline"
                >
                  Visit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationControlled page={page} setPage={setPage} />
    </div>
  );
}

export default DerivativesTable;
