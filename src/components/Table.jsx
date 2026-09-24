import PropTypes from 'prop-types';
import { useState } from 'react';
import PaginationControlled from './Pagination';
import DataTable from './ui/DataTable';
import Toast from './ui/Toast';
import ChangeBadge from './ui/ChangeBadge';
import { BiStar } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import { addToWatchlist } from '../features/watchListSlice';
import { Link } from 'react-router-dom';
import { formatUsd } from '../utils/format';

const columns = [
  { key: 'rank', label: '#' },
  { key: 'star', label: '' },
  { key: 'coin', label: 'Coin' },
  { key: 'price', label: 'Price' },
  { key: 'change', label: '24h Change' },
  { key: 'volume', label: '24h Volume' },
  { key: 'mcap', label: 'Market Cap' },
  { key: 'spark', label: 'Last 7 Days' },
];

// Presentational table — data & loading come from the parent (HomePage).
function CryptoTable({ coins = [], loading = false, page = 1, setPage = () => {} }) {
  const watchlist = useSelector((state) => state.watchlist);
  const dispatch = useDispatch();
  const [notification, setNotification] = useState('');

  const addToWatchlistHandler = (coin) => {
    if (!watchlist.some((watch) => watch.id === coin.id)) {
      dispatch(addToWatchlist(coin));
      setNotification(`${coin.name} added to Watchlist!`);
    } else {
      setNotification(`${coin.name} is already in Watchlist!`);
    }
    setTimeout(() => setNotification(''), 3000);
  };

  const isInWatchlist = (coinId) => watchlist.some((watch) => watch.id === coinId);

  const renderSparkline = (coin) => {
    const prices = coin.sparkline_in_7d?.price;
    if (!prices || prices.length === 0) return null;
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min || 1;
    const points = prices
      .map((price, i) => `${i * (100 / prices.length)},${50 - ((price - min) / range) * 50}`)
      .join(' ');
    const up = (coin.price_change_percentage_7d_in_currency ?? 0) >= 0;
    return (
      <div style={{ width: '100px', height: '50px' }}>
        <svg width="100" height="50">
          <polyline fill="none" stroke={up ? '#10b981' : '#dc2626'} strokeWidth="2" points={points} />
        </svg>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-2 sm:p-4">
      <Toast message={notification} />

      <DataTable columns={columns} loading={loading} scrollable>
        {coins.map((coin, index) => (
          <tr key={coin.id} className="border-b border-gray-200">
            <td className="px-2 sm:px-4 py-3 font-semibold text-gray-900">
              {(page - 1) * 100 + index + 1}
            </td>
            <td className="px-2 sm:px-4 py-3">
              <button
                onClick={() => addToWatchlistHandler(coin)}
                className={`text-xl hover:text-emerald-400 ${isInWatchlist(coin.id) ? 'text-emerald-500' : 'text-gray-400'}`}
                aria-label={`Add ${coin.name} to watchlist`}
              >
                <BiStar />
              </button>
            </td>
            <td className="px-2 sm:px-4 py-3">
              <div className="flex items-center">
                <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
                <Link to={`/${coin.id}`} className="font-semibold text-gray-900 p-2 hover:text-emerald-600">
                  {coin.name}
                </Link>
                <span className="text-gray-500 text-xs">{coin.symbol.toUpperCase()}</span>
              </div>
            </td>
            <td className="px-2 sm:px-4 py-3 text-gray-900 font-medium">
              {formatUsd(coin.current_price)}
            </td>
            <td className="px-2 sm:px-4 py-3">
              <ChangeBadge value={coin.price_change_percentage_24h} />
            </td>
            <td className="px-2 sm:px-4 py-3 text-gray-900">{formatUsd(coin.total_volume, 0)}</td>
            <td className="px-2 sm:px-4 py-3 text-gray-900">{formatUsd(coin.market_cap, 0)}</td>
            <td className="px-2 sm:px-4 py-3">{renderSparkline(coin)}</td>
          </tr>
        ))}
      </DataTable>

      <PaginationControlled page={page} setPage={setPage} />
    </div>
  );
}

CryptoTable.propTypes = {
  coins: PropTypes.array,
  loading: PropTypes.bool,
  page: PropTypes.number,
  setPage: PropTypes.func,
};

export default CryptoTable;
