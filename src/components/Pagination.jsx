import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function PaginationControlled({ page, setPage, totalPages = 10 }) {
  const total = Math.max(totalPages, 1);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const handleChange = (newPage) => {
    if (newPage >= 1 && newPage <= total) {
      setPage(newPage);
    }
  };

  const getVisiblePages = () => {
    if (isMobile) {
      const visiblePages = [];
      if (page > 1) visiblePages.push(page - 1);
      visiblePages.push(page);
      if (page < total) visiblePages.push(page + 1);
      return visiblePages;
    }
    return Array.from({ length: total }, (_, index) => index + 1);
  };

  const baseClass =
    "px-3 py-1.5 border rounded-lg transition-colors duration-200 flex items-center";
  const idleClass = "hover:bg-emerald-500 hover:text-white";
  const disabledClass = "text-gray-400 cursor-not-allowed";

  return (
    <div className="flex justify-center my-4">
      <div className="flex space-x-2">
        <button
          onClick={() => handleChange(page - 1)}
          disabled={page === 1}
          className={`${baseClass} ${page === 1 ? disabledClass : idleClass}`}
        >
          {isMobile ? <FaChevronLeft /> : "Previous"}
        </button>

        {getVisiblePages().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handleChange(pageNumber)}
            className={`${baseClass} ${
              page === pageNumber
                ? "bg-emerald-500 text-white"
                : idleClass
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={() => handleChange(page + 1)}
          disabled={page === total}
          className={`${baseClass} ${page === total ? disabledClass : idleClass}`}
        >
          {isMobile ? <FaChevronRight /> : "Next"}
        </button>
      </div>
    </div>
  );
}

PaginationControlled.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  totalPages: PropTypes.number,
};
