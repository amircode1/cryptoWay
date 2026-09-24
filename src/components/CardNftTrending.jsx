import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ChangeBadge from './ui/ChangeBadge';

function CardNftTrending({ title, coins }) {
  if (!coins) {
    return <div className="text-center text-emerald-500">Loading...</div>;
  }

  if (coins.length === 0) {
    return <div className="text-center text-red-500">No data available.</div>;
  }

  return (
    <div className="bg-white rounded-xl border-2 border-emerald-300 shadow-card p-4 w-full h-full flex flex-col transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
      <h2 className="font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        {title}
      </h2>
      <ul className="space-y-2 flex-1">
        {coins.map((coin, index) => (
          <li
            key={index}
            className="flex items-center justify-between text-gray-700 p-2 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            <div className="flex items-center gap-2 min-w-0">
              {coin?.thumb && (
                <img src={coin.thumb} alt={`${coin?.name} icon`} className="w-6 h-6 rounded-full" />
              )}
              <Link to={`/nft-list/${coin?.id}`} className="font-semibold text-gray-900 hover:text-emerald-500 truncate">
                {coin?.name}
              </Link>
            </div>
            <div className="flex flex-col items-end shrink-0 gap-1">
              <span className="font-medium text-gray-900 text-sm">{coin?.data?.floor_price ?? 'N/A'}</span>
              <ChangeBadge value={coin?.floor_price_24h_percentage_change} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

CardNftTrending.propTypes = {
  title: PropTypes.string.isRequired,
  coins: PropTypes.array,
};

export default CardNftTrending;
