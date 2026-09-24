import PropTypes from 'prop-types';
import { useState } from 'react';
import DataTable from './ui/DataTable';
import PaginationControlled from './Pagination';
import { formatUsd } from '../utils/format';

const columns = [
  { key: 'exchange', label: 'Exchange' },
  { key: 'pair', label: 'Pair' },
  { key: 'last', label: 'Last Price' },
  { key: 'volume', label: 'Volume (24h)', className: 'text-center' },
  { key: 'trust', label: 'Trust Score', className: 'text-center' },
  { key: 'url', label: 'Trade URL' },
];

const MarketTable = ({ markets = [] }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.max(Math.ceil(markets.length / itemsPerPage), 1);

  if (!markets || markets.length === 0) {
    return <p className="text-gray-500 text-center py-8">No market data available.</p>;
  }

  const startIndex = (page - 1) * itemsPerPage;
  const currentMarkets = markets.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <DataTable columns={columns}>
        {currentMarkets.map((market, index) => (
          <tr key={index} className="border-b border-gray-200 hover:bg-emerald-50 transition-colors">
            <td className="px-4 py-3">{market.market?.name || 'N/A'}</td>
            <td className="px-4 py-3">{`${market.base}/${market.target}`}</td>
            <td className="px-4 py-3 font-medium">{formatUsd(market.last)}</td>
            <td className="px-4 py-3 text-center">{formatUsd(market.volume, 0)}</td>
            <td className="px-4 py-3 text-center">
              {market.trust_score ? (
                <span className="inline-block w-4 h-4 bg-emerald-500 rounded-full" title="Trusted" />
              ) : (
                'N/A'
              )}
            </td>
            <td className="px-4 py-3">
              {market.trade_url ? (
                <a
                  href={market.trade_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-800 font-medium"
                >
                  Trade
                </a>
              ) : (
                'N/A'
              )}
            </td>
          </tr>
        ))}
      </DataTable>

      <PaginationControlled page={page} setPage={setPage} totalPages={totalPages} />
    </>
  );
};

MarketTable.propTypes = {
  markets: PropTypes.array,
};

export default MarketTable;
