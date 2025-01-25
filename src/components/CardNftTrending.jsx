import React from 'react';
import { Link } from 'react-router-dom';

function CardNftTrending({ title, coins }) {
  if (!coins) {
    return <div className="text-center text-emerald-500">Loading...</div>;
  }

  if (coins.length === 0) {
    return <div className="text-center text-red-500">No data available.</div>;
  }

  return (
    <div className="rounded-lg shadow-lg p-4 w-96 h-full">
      <h2 className="font-semibold text-lg text-gray-900 mb-4">{title}</h2>
      <ul className="space-y-2">
        {coins.map((coin, index) => (
          <li key={index} className="flex items-center justify-between text-gray-700 p-2 rounded-lg hover:bg-green-100">
            <div className="flex items-center gap-2">
              <img src={coin?.thumb} alt={`${coin?.name} icon`} className="w-6 h-6" />
              <Link to={`/nft/${coin?.id}`} className="font-semibold text-gray-900 hover:text-emerald-500">{coin?.name}</Link>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-medium text-gray-900">
                {coin?.data.floor_price || 0}
              </span>
              <span className={`text-sm ${coin?.floor_price_24h_percentage_change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {typeof coin?.floor_price_24h_percentage_change === 'number'
                  ? coin?.floor_price_24h_percentage_change.toFixed(2)
                  : 'N/A'}% 
                {coin?.floor_price_24h_percentage_change > 0 ? '▲' : '▼'}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CardNftTrending;