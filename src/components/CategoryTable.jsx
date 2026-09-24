import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import DataTable from './ui/DataTable';
import PaginationControlled from './Pagination';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { percentClass } from '../utils/format';

const columns = [
  { key: 'rank', label: '#' },
  { key: 'category', label: 'Category' },
  { key: 'coins', label: 'Coins', className: 'hidden sm:table-cell w-44' },
  { key: 'change', label: '24h', className: 'hidden md:table-cell' },
  { key: 'mcap', label: 'Market Cap', className: 'hidden lg:table-cell' },
  { key: 'volume', label: '24h Volume', className: 'hidden lg:table-cell' },
  { key: 'details', label: 'Details', className: 'sm:hidden text-center' },
];

const formatChange = (value) => {
  if (value === null || value === undefined) return 'No data';
  return `${value.toFixed(2)}% ${value < 0 ? '▼' : '▲'}`;
};

const formatNumber = (value) => {
  if (value === null || value === undefined) return 'N/A';
  return value.toLocaleString();
};

function CategoryTable({ data, totalPages, isLoading, isError, error }) {
  const [page, setPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const itemsPerPage = 100;

  const toggleRow = (index) => {
    setExpandedRow((prev) => (prev === index ? null : index));
  };

  if (isError) {
    return <div className="text-center text-red-500 py-8">Error loading data: {error?.message}</div>;
  }

  if (!isLoading && (!data || !Array.isArray(data) || data.length === 0)) {
    return <div className="text-center text-gray-500 py-8">No categories available to display.</div>;
  }

  const filteredData = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const renderCoins = (item) => {
    if (Array.isArray(item.top_3_coins) && item.top_3_coins.length > 0) {
      return (
        <div className="flex items-center">
          {item.top_3_coins.map((coin, index) => (
            <img key={index} src={coin} alt={`Coin ${index + 1}`} className="w-8 h-8 -ml-1 first:ml-0 rounded-full border-2 border-white" />
          ))}
        </div>
      );
    }
    return <span className="text-gray-400">No image</span>;
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <DataTable columns={columns} loading={isLoading} skeletonRows={5}>
        {filteredData.map((item, index) => (
          <Fragment key={item.id || index}>
            <tr
              className="border-b border-gray-200 hover:bg-emerald-50 cursor-pointer transition-colors"
              onClick={() => toggleRow(index)}
            >
              <td className="px-4 py-3 font-semibold text-gray-900">{(page - 1) * itemsPerPage + index + 1}</td>
              <td className="px-4 py-3 font-semibold w-1/5">{item.name}</td>
              <td className="px-4 py-3 hidden sm:table-cell w-44">{renderCoins(item)}</td>
              <td className={`px-4 py-3 hidden md:table-cell font-medium ${percentClass(item.market_cap_change_24h ?? 0)}`}>
                {formatChange(item.market_cap_change_24h)}
              </td>
              <td className="px-4 py-3 text-gray-900 hidden lg:table-cell">{formatNumber(item.market_cap)}</td>
              <td className="px-4 py-3 text-gray-700 hidden lg:table-cell">{formatNumber(item.volume_24h)}</td>
              <td className="px-4 py-3 sm:hidden text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleRow(index);
                  }}
                  className="text-emerald-600 hover:text-emerald-800"
                  aria-label="Toggle details"
                >
                  {expandedRow === index ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </td>
            </tr>

            {/* Expandable row for mobile */}
            {expandedRow === index && (
              <tr className="sm:hidden">
                <td colSpan={columns.length} className="px-4 py-3 bg-emerald-50/50">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Coins:</p>
                      <div className="flex items-center">{renderCoins(item)}</div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">24h Change:</p>
                      <p className={percentClass(item.market_cap_change_24h ?? 0)}>
                        {formatChange(item.market_cap_change_24h)}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Market Cap:</p>
                      <p>{formatNumber(item.market_cap)}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">24h Volume:</p>
                      <p>{formatNumber(item.volume_24h)}</p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </Fragment>
        ))}
      </DataTable>

      <div className="mt-4 flex justify-center">
        <PaginationControlled page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
}

CategoryTable.propTypes = {
  data: PropTypes.array,
  totalPages: PropTypes.number,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  error: PropTypes.object,
};

export default CategoryTable;
