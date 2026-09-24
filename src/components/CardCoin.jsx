import PropTypes from 'prop-types';
import { formatUsd, percentClass } from '../utils/format';

function CardCoin({ coin }) {
  if (!coin) {
    return <div>Loading...</div>;
  }

  const price = coin.current_price ?? coin.market_data?.current_price?.usd ?? null;
  const priceChange = coin.price_change_percentage_24h ?? coin.market_data?.price_change_percentage_24h ?? null;

  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {coin.name} <span className="text-sm text-gray-500">({coin.symbol?.toUpperCase()})</span>
        </h3>
        <p className="text-sm text-gray-500 mt-2">Price</p>
        <p className="text-xl font-bold text-gray-900">{formatUsd(price, typeof price === 'number' && price < 1 ? 6 : 2)}</p>
        {typeof priceChange === 'number' && (
          <p className={`text-sm font-medium ${percentClass(priceChange)}`}>
            {priceChange >= 0 ? '▲' : '▼'} {Math.abs(priceChange).toFixed(2)}% (24h)
          </p>
        )}
      </div>
      {coin.image && (
        <img
          className="w-14 h-14 rounded-full shrink-0"
          src={coin.image}
          alt={coin.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
          }}
        />
      )}
    </div>
  );
}

CardCoin.propTypes = {
  coin: PropTypes.object,
};

export default CardCoin;
