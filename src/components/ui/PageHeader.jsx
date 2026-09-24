import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

// Standard page header block (title + subtitle + optional tab links).
const PageHeader = ({ title, subtitle, tabs = [], loading = false }) => {
  return (
    <>
      <div className="w-full border-b-2 border-emerald-300">
        {loading ? (
          <div className="p-4">
            <Skeleton height={40} className="mb-4" />
            <Skeleton count={2} className="mb-2" />
          </div>
        ) : (
          <div className="p-4 pb-2">
            <h1 className="text-2xl md:text-3xl font-bold font-display text-gray-900">{title}</h1>
            <div className="mt-2 h-1 w-14 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300" />
          </div>
        )}
        {subtitle && (
          <p className="text-sm md:text-base text-gray-500 px-4 pb-4 font-semibold">{subtitle}</p>
        )}
      </div>

      {tabs.length > 0 && (
        <div className="flex flex-row flex-wrap gap-2 md:gap-4 justify-start items-start m-2 w-full">
          {tabs.map((tab) => (
            <Link
              key={tab.to}
              to={tab.to}
              className="text-sm md:text-base text-emerald-600 hover:text-emerald-700 hover:bg-emerald-200 p-2 font-sans font-bold rounded transition duration-200 ease-in-out hover:scale-105"
            >
              {tab.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

PageHeader.propTypes = {
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  loading: PropTypes.bool,
};

export default PageHeader;
