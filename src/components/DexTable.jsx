import PropTypes from 'prop-types';
import DataTable from './ui/DataTable';
import { formatUsd } from '../utils/format';

const columns = [
  { key: 'rank', label: '#' },
  { key: 'name', label: 'Name' },
  { key: 'share', label: 'Market Share' },
  { key: 'volume', label: 'Volume (24h)' },
  { key: 'liquidity', label: 'Liquidity' },
  { key: 'price', label: 'Price' },
  { key: 'change', label: 'Price Change (24h)' },
  { key: 'updated', label: 'Last Updated' },
  { key: 'website', label: 'Website' },
];

function DexTable({ data }) {
  const tableData = Array.isArray(data) ? data : [];

  return (
    <DataTable columns={columns} empty={tableData.length === 0} emptyState="No DEX data available">
      {tableData.map((dex, index) => {
        const quote = dex.quote?.[0] || {};
        return (
          <tr key={dex.id || index} className="border-b border-gray-200 hover:bg-emerald-50 transition-colors">
            <td className="px-4 py-3 text-center font-semibold text-gray-900">{index + 1}</td>
            <td className="px-4 py-3 font-medium text-gray-900">{dex.name}</td>
            <td className="px-4 py-3">{dex.market_share ? `${dex.market_share}%` : 'N/A'}</td>
            <td className="px-4 py-3">{formatUsd(quote.volume_24h, 0)}</td>
            <td className="px-4 py-3">{formatUsd(quote.liquidity, 0)}</td>
            <td className="px-4 py-3">{formatUsd(quote.price)}</td>
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
                  className="text-emerald-600 hover:text-emerald-800 font-medium"
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
    </DataTable>
  );
}

DexTable.propTypes = {
  data: PropTypes.array,
};

export default DexTable;
