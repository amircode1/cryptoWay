import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function DexTable({ data }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => setLoading(false), 2000); // Adjust delay as needed
    return () => clearTimeout(timer);
  }, []);

  // Fallback to an empty array if data is invalid
  const tableData = Array.isArray(data) ? data : [];

  if (loading) {
    // Skeleton loader for the table
    return (
      <div className="w-full max-w-7xl mx-auto overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-emerald-500 text-gray-50 uppercase font-semibold">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Market Share</th>
              <th className="px-4 py-2">Volume (24h)</th>
              <th className="px-4 py-2">Liquidity</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Price Change (24h)</th>
              <th className="px-4 py-2">Last Updated</th>
              <th className="px-4 py-2">Website</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, idx) => (
              <tr key={idx} className="border-b border-gray-300">
                <td className="px-4 py-3 text-center">
                  <Skeleton width={30} />
                </td>
                <td className="px-4 py-3">
                  <Skeleton width={100} />
                </td>
                <td className="px-4 py-3">
                  <Skeleton width={60} />
                </td>
                <td className="px-4 py-3">
                  <Skeleton width={80} />
                </td>
                <td className="px-4 py-3">
                  <Skeleton width={80} />
                </td>
                <td className="px-4 py-3">
                  <Skeleton width={70} />
                </td>
                <td className="px-4 py-3">
                  <Skeleton width={50} />
                </td>
                <td className="px-4 py-3">
                  <Skeleton width={100} />
                </td>
                <td className="px-4 py-3">
                  <Skeleton width={100} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (tableData.length === 0) {
    return <div className="text-center text-gray-700">No data available</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-emerald-500 text-gray-50 uppercase font-semibold">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Market Share</th>
            <th className="px-4 py-2">Volume (24h)</th>
            <th className="px-4 py-2">Liquidity</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Price Change (24h)</th>
            <th className="px-4 py-2">Last Updated</th>
            <th className="px-4 py-2">Website</th>
          </tr>
        </thead>
        <tbody className="font-sans">
          {tableData.map((dex, index) => {
            // Extract quote data
            const quote = dex.quote?.[0] || {};

            return (
              <tr key={dex.id || index} className="border-b border-gray-300 hover:bg-green-100">
                <td className="px-4 py-3 text-center">{index + 1}</td>
                <td className="px-4 py-3">{dex.name}</td>
                <td className="px-4 py-3">{dex.market_share ? `${dex.market_share}%` : 'N/A'}</td>
                <td className="px-4 py-3">${quote.volume_24h?.toLocaleString() || 'N/A'}</td>
                <td className="px-4 py-3">${quote.liquidity?.toLocaleString() || 'N/A'}</td>
                <td className="px-4 py-3">${quote.price?.toFixed(2) || 'N/A'}</td>
                <td className="px-4 py-3 text-center">
                  {quote.percent_change_volume_24h?.toFixed(2) || 'N/A'}%
                </td>
                <td className="px-4 py-3">{dex.last_updated || 'N/A'}</td>
                <td className="px-4 py-3">
                  {dex.urls?.website ? (
                    <a
                      href={dex.urls.website[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-800"
                    >
                      Visit Website
                    </a>
                  ) : (
                    'N/A'
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DexTable;
