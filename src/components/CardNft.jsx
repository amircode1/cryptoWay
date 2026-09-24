import PropTypes from 'prop-types';
import { formatUsd, percentClass } from '../utils/format';

function CardNft({ nft }) {
  if (!nft) {
    return <div>Loading...</div>;
  }

  const price = typeof nft.floor_price === 'number' ? nft.floor_price : null;
  const priceChange = typeof nft.floor_price_24h_percentage_change === 'number' ? nft.floor_price_24h_percentage_change : null;

  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {nft.name} <span className="text-sm text-gray-500">({nft.symbol?.toUpperCase()})</span>
        </h3>
        <p className="text-sm text-gray-500 mt-2">Floor Price</p>
        <p className="text-xl font-bold text-gray-900">{formatUsd(price)}</p>
        {priceChange !== null && (
          <p className={`text-sm font-medium ${percentClass(priceChange)}`}>
            {priceChange >= 0 ? '▲' : '▼'} {Math.abs(priceChange).toFixed(2)}% (24h)
          </p>
        )}
      </div>
      {nft.thumb && (
        <img
          className="w-14 h-14 rounded-full shrink-0"
          src={nft.thumb}
          alt={nft.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
          }}
        />
      )}
    </div>
  );
}

CardNft.propTypes = {
  nft: PropTypes.object,
};

export default CardNft;
