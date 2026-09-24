import PropTypes from 'prop-types';
import DataTable from './ui/DataTable';
import ChangeBadge from './ui/ChangeBadge';
import { formatUsd } from '../utils/format';

const columns = [
  { key: 'rank', label: 'Rank' },
  { key: 'coin', label: 'Coin' },
  { key: 'price', label: 'Price' },
  { key: 'change', label: '24h Change' },
];

function CoinTable({ coins = [], loading = false }) {
  return (
    <DataTable columns={columns} loading={loading} skeletonRows={10} className="mx-auto">
      {coins.map((coin) => (
        <tr key={coin.id} className="border-b border-gray-200">
          <td className="px-4 py-3 font-semibold text-gray-900">{coin.market_cap_rank}</td>
          <td className="px-4 py-3">
            <div className="flex items-center">
              <img src={coin.image} alt={coin.name || 'Coin'} className="w-6 h-6 rounded-full mr-2" />
              <span className="font-semibold text-gray-900">{coin.name || 'N/A'}</span>
              <span className="text-gray-500 text-xs ml-2">{coin.symbol ? coin.symbol.toUpperCase() : 'N/A'}</span>
            </div>
          </td>
          <td className="px-4 py-3 text-gray-900 font-medium">{formatUsd(coin.current_price)}</td>
          <td className="px-4 py-3">
            <ChangeBadge value={coin.price_change_percentage_24h} />
          </td>
        </tr>
      ))}
    </DataTable>
  );
}

CoinTable.propTypes = {
  coins: PropTypes.array,
  loading: PropTypes.bool,
};

export default CoinTable;
