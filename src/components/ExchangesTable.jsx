import { useState } from 'react';
import { useExchangesQuery } from '../queries/useQuery';
import PaginationControlled from './Pagination';
import DataTable from './ui/DataTable';

const columns = [
  { key: 'rank', label: '#', className: 'text-center' },
  { key: 'name', label: 'Name' },
  { key: 'year', label: 'Year Established', className: 'text-center' },
  { key: 'country', label: 'Country', className: 'text-center' },
  { key: 'trust', label: 'Trust Score', className: 'text-center' },
  { key: 'volume', label: '24h Volume (BTC)', className: 'text-center' },
  { key: 'website', label: 'Website', className: 'text-center' },
];

function ExchangesTable() {
  const [page, setPage] = useState(1);
  const { data, isError, isLoading, error } = useExchangesQuery(page);

  if (isError) {
    return <div className="text-red-500 text-center py-8">Error: {error?.message || 'An unknown error occurred.'}</div>;
  }

  if (!isLoading && (!data || data.length === 0)) {
    return <div className="text-gray-500 text-center py-8">No exchanges data available.</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <DataTable columns={columns} loading={isLoading}>
        {data?.map((exchange) => (
          <tr key={exchange.id} className="border-b border-gray-200 hover:bg-emerald-50 transition-colors">
            <td className="px-4 py-3 text-center font-semibold text-gray-900">{exchange.trust_score_rank}</td>
            <td className="px-4 py-3">
              <div className="flex items-center">
                {exchange.image && (
                  <img
                    src={exchange.image}
                    alt={exchange.name}
                    className="w-6 h-6 rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                <span className="font-semibold text-gray-900 p-2">{exchange.name}</span>
              </div>
            </td>
            <td className="px-4 py-3 text-center">{exchange.year_established || 'N/A'}</td>
            <td className="px-4 py-3 text-center">{exchange.country || 'N/A'}</td>
            <td className="px-4 py-3 text-center">
              <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-md font-semibold">
                {exchange.trust_score}/10
              </span>
            </td>
            <td className="px-4 py-3 text-center">
              {typeof exchange.trade_volume_24h_btc === 'number'
                ? exchange.trade_volume_24h_btc.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : 'N/A'}
            </td>
            <td className="px-4 py-3 text-center">
              <a
                href={exchange.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-800 font-medium"
              >
                Visit
              </a>
            </td>
          </tr>
        ))}
      </DataTable>
      <PaginationControlled page={page} setPage={setPage} />
    </div>
  );
}

export default ExchangesTable;
