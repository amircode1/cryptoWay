import PropTypes from 'prop-types';
import { formatUsd } from '../utils/format';

// Seamless marquee of top coins by market cap. Data is duplicated for a
// smooth -50% translate loop; pauses on hover.
const TickerMarquee = ({ coins = [] }) => {
  if (!coins || coins.length === 0) return null;

  const items = [...coins, ...coins];

  return (
    <div className="overflow-hidden whitespace-nowrap border-y border-white/20 bg-white/10 backdrop-blur-sm">
      <div className="inline-flex animate-marquee hover:[animation-play-state:paused]">
        {items.map((coin, i) => {
          const change = coin.price_change_percentage_24h ?? 0;
          const positive = change >= 0;
          return (
            <div key={`${coin.id}-${i}`} className="inline-flex items-center gap-2 px-5 py-2.5 text-sm text-emerald-50">
              <img src={coin.image} alt="" className="w-4 h-4 rounded-full" />
              <span className="font-semibold">{coin.symbol.toUpperCase()}</span>
              <span className="tabular-nums text-emerald-100">{formatUsd(coin.current_price)}</span>
              <span className={`tabular-nums font-semibold ${positive ? 'text-emerald-300' : 'text-red-300'}`}>
                {positive ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

TickerMarquee.propTypes = {
  coins: PropTypes.array,
};

export default TickerMarquee;
