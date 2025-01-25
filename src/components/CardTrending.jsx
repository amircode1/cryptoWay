import React from 'react';
import { Link } from 'react-router-dom';

function CardTrending({ title, coins }) {
  if (!coins) {
    return <div className="text-center text-emerald-500">Loading...</div>;
  }

  if (coins.length === 0) {
    return <div className="text-center text-red-500">No data available.</div>;
  }

  return (
    <div className="bg-slate-50 rounded-lg shadow-md p-4 w-80 h-full">
      <h2 className="font-semibold text-lg text-gray-900 mb-4">{title}</h2>
      <ul className="space-y-2">
        {coins.map((coin, index) => (
          <li key={index} className="flex items-center justify-between text-gray-700 p-2 rounded-lg hover:bg-green-100">
            <div className="flex items-center gap-2">
              <img src={coin.item.small} alt={`${coin.item.name} icon`} className="w-6 h-6" />
              <Link to={`/${coin.item.id}`} className="font-semibold text-gray-900 hover:text-emerald-500">{coin.item.name}</Link>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-medium text-gray-900">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(coin.item.data.price || 0)}
              </span>
              <span className={`text-sm ${coin.item.data.price_change_percentage_24h.usd > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {Math.abs(coin.item.data.price_change_percentage_24h.usd).toFixed(2)}% 
                {coin.item.data.price_change_percentage_24h.usd > 0 ? '▲' : '▼'}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CardTrending;
