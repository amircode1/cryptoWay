import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

// Shared table shell: emerald gradient header, zebra rows, sticky option,
// skeleton rows, and horizontal scroll. Callers provide <tr> children.
const DataTable = ({
  columns = [],
  loading = false,
  skeletonRows = 10,
  scrollable = false,
  empty = false,
  emptyState = 'No data available',
  children,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-xl border-2 border-emerald-300 shadow-card overflow-hidden data-table ${className}`}>
      <div className={scrollable ? 'max-h-[70vh] overflow-auto' : 'overflow-x-auto'}>
        <table className="min-w-full text-xs sm:text-sm md:text-base text-left text-gray-700 tabular-nums">
          <thead className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-gray-50 uppercase font-semibold sticky top-0 z-10">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-2 sm:px-4 py-3 whitespace-nowrap ${col.className || ''}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="font-sans">
            {loading ? (
              Array.from({ length: skeletonRows }).map((_, rowIndex) => (
                <tr key={rowIndex} className="border-b border-gray-200">
                  {columns.map((col) => (
                    <td key={col.key} className="px-2 sm:px-4 py-3">
                      <Skeleton />
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              children
            )}
          </tbody>
        </table>
        {!loading && empty && (
          <p className="text-center text-gray-500 py-8">{emptyState}</p>
        )}
      </div>
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.node.isRequired,
      className: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
  skeletonRows: PropTypes.number,
  scrollable: PropTypes.bool,
  empty: PropTypes.bool,
  emptyState: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default DataTable;
