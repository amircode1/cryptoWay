import React from "react";
import { useMediaQuery } from "react-responsive"; // برای تشخیص صفحه‌نمایش‌های کوچک‌تر
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // آیکون‌های قبلی و بعدی

export default function PaginationControlled({ page, setPage }) {
  const totalPages = 10; // تعداد کل صفحات
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" }); // تشخیص موبایل

  const handleChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage); // تغییر صفحه
    }
  };

  // محاسبه صفحات قابل نمایش در موبایل
  const getVisiblePages = () => {
    if (isMobile) {
      const visiblePages = [];
      if (page > 1) visiblePages.push(page - 1);
      visiblePages.push(page);
      if (page < totalPages) visiblePages.push(page + 1);
      return visiblePages;
    }
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  };

  return (
    <div className="flex justify-center my-4">
      <div className="flex space-x-2">
        {/* دکمه قبلی */}
        <button
          onClick={() => handleChange(page - 1)}
          disabled={page === 1}
          className={`px-3 py-1 border rounded flex items-center ${
            page === 1
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-emerald-500 hover:text-white"
          }`}
        >
          {isMobile ? <FaChevronLeft /> : "Previous"}
        </button>

        {/* اعداد صفحات */}
        {getVisiblePages().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handleChange(pageNumber)}
            className={`px-3 py-1 border rounded ${
              page === pageNumber
                ? "bg-emerald-500 text-white"
                : "hover:bg-emerald-500 hover:text-white"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        {/* دکمه بعدی */}
        <button
          onClick={() => handleChange(page + 1)}
          disabled={page === totalPages}
          className={`px-3 py-1 border rounded flex items-center ${
            page === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-emerald-500 hover:text-white"
          }`}
        >
          {isMobile ? <FaChevronRight /> : "Next"}
        </button>
      </div>
    </div>
  );
}