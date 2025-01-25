import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton styles

function CoinTable({ coins }) {
  const [loading, setLoading] = useState(true);

  // Simulate a delay for loading data (you can remove this in production)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Simulate loading completion
    }, 2000); // 2-second loading simulation
    return () => clearTimeout(timer); // Clean up the timeout on unmount
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto overflow-x-auto bg-slate-50">
      <table className="w-full text-sm text-left text-gray-700 divide-y divide-gray-300">
        <thead className="bg-emerald-500 text-gray-50 uppercase font-semibold">
          <tr>
            <th className="px-4 py-2 text-left">Rank</th>
            <th className="px-4 py-2 text-left">Coin</th>
            <th className="px-4 py-2 text-right">Price</th>
            <th className="px-4 py-2 text-right">24h Change</th>
          </tr>
        </thead>
        <tbody className="font-sans">
          {loading ? (
            // Skeleton loaders for each row
            [...Array(10)].map((_, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="px-4 py-3">
                  <Skeleton width={40} height={20} />
                </td>
                <td className="px-4 py-3 flex items-center">
                  <Skeleton circle width={24} height={24} />
                  <Skeleton width={100} height={20} className="ml-2" />
                </td>
                <td className="px-4 py-3 text-right">
                  <Skeleton width={80} height={20} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Skeleton width={60} height={20} />
                </td>
              </tr>
            ))
          ) : (
            // Actual data rows after loading completes
            coins.map((coin) => (
              <tr key={coin.id} className="border-b border-gray-300 hover:bg-green-100">
                <td className="px-4 py-3 font-semibold text-gray-900">{coin.market_cap_rank}</td>
                <td className="px-4 py-3 flex items-center">
                  <img
                    src={coin.image}
                    alt={coin.name || 'Coin'}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <span className="font-semibold text-gray-900">
                    {coin.name || 'N/A'}
                  </span>
                  <span className="text-gray-500 text-xs ml-2">
                    {coin.symbol ? coin.symbol.toUpperCase() : 'N/A'}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-900 text-right">
                  ${coin.current_price.toLocaleString() || 'N/A'}
                </td>
                <td className={`px-4 py-3 text-right ${coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {coin.price_change_percentage_24h !== null
                    ? `${coin.price_change_percentage_24h.toFixed(2)}%`
                    : 'N/A'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CoinTable;
