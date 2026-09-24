import PropTypes from 'prop-types';
import DataTable from './ui/DataTable';
import PaginationControlled from './Pagination';

const columns = [
  { key: 'rank', label: '#' },
  { key: 'name', label: 'Name' },
  { key: 'year', label: 'Year Established' },
  { key: 'country', label: 'Country', className: 'text-center' },
  { key: 'interest', label: 'Open Interest (BTC)' },
  { key: 'volume', label: '24h Volume (BTC)' },
  { key: 'website', label: 'Website', className: 'text-center' },
];

function DerivativesTable({ data, page, setPage }) {
  const tableData = Array.isArray(data) ? data : [];

  return (
    <div className="w-full max-w-7xl mx-auto">
      <DataTable columns={columns} empty={tableData.length === 0} emptyState="No derivatives data available">
        {tableData.map((exchange, index) => (
          <tr key={exchange.id} className="border-b border-gray-200 hover:bg-emerald-50 transition-colors">
            <td className="px-4 py-3 text-center font-semibold text-gray-900">{(page - 1) * 100 + index + 1}</td>
            <td className="px-4 py-3">
              <div className="flex items-center">
                {exchange.image && (
                  <img
                    src={exchange.image}
                    alt={exchange.name}
                    className="w-6 h-6 rounded-full mr-2"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                <span className="font-medium text-gray-900">{exchange.name}</span>
              </div>
            </td>
            <td className="px-4 py-3 text-center">{exchange.year_established || 'N/A'}</td>
            <td className="px-4 py-3 text-center">{exchange.country || 'N/A'}</td>
            <td className="px-4 py-3 text-center">{(exchange.open_interest_btc ?? 0).toLocaleString()} BTC</td>
            <td className="px-4 py-3 text-center">
              {parseFloat(exchange.trade_volume_24h_btc ?? 0).toLocaleString()} BTC
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

DerivativesTable.propTypes = {
  data: PropTypes.array,
  page: PropTypes.number,
  setPage: PropTypes.func,
};

export default DerivativesTable;
