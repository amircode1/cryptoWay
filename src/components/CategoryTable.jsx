import React, { useState } from "react";
import PaginationControlled from "./Pagination";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // آیکون‌های باز و بسته کردن
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CategoryTable({ data, totalPages, isLoading, isError, error }) {
  const [page, setPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null); // برای مدیریت ردیف‌های باز شده

  const itemsPerPage = 100;

  // تابع برای باز و بسته کردن ردیف‌ها
  const toggleRow = (index) => {
    if (expandedRow === index) {
      setExpandedRow(null); // اگر ردیف قبلاً باز بود، بسته شود
    } else {
      setExpandedRow(index); // اگر ردیف بسته بود، باز شود
    }
  };

  // حالت Loading
  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-4">
        <div className="w-full bg-emerald-500 text-white font-semibold overflow-hidden">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr>{/* eslint-disable-next-line */}
                <th className="px-3 py-2 flex justify-start items-center text-center">
                  #
                </th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2 hidden sm:table-cell">Coins</th>
                <th className="px-4 py-2 hidden md:table-cell">24h</th>
                <th className="px-4 py-2 hidden lg:table-cell">Market Cap</th>
                <th className="px-4 py-2 hidden lg:table-cell">24h Volume</th>
                <th className="px-4 py-2 sm:hidden">Details</th>
              </tr>
            </thead>
          </table>
        </div>

        {/* اسکلت‌های Loading */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="border-b p-4">
            <Skeleton height={30} />
            <Skeleton height={20} width="80%" />
            <Skeleton height={20} width="60%" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error loading data: {error?.message}
      </div>
    );
  }

  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No categories available to display.
      </div>
    );
  }

  const filteredData = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {/* نوار سبز بهینه‌شده */}
      <div className="w-full bg-emerald-500 text-white font-semibold overflow-hidden">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr>
              <th className="px-3 py-2 flex justify-start items-center text-center">#</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2 hidden sm:table-cell w-52 pl-16">Coins</th>
              <th className="px-4 py-2 hidden md:table-cell">24h</th>
              <th className="px-4 py-2 hidden lg:table-cell">Market Cap</th>
              <th className="px-4 py-2 hidden lg:table-cell">24h Volume</th>
              <th className="px-4 py-2 sm:hidden">Details</th> {/* ستون جزئیات برای موبایل */}
            </tr>
          </thead>
        </table>
      </div>

      {/* جدول داده‌ها */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-800">
          <tbody className="font-sans">
            {filteredData.map((item, index) => (
              <React.Fragment key={item.id || index}>
                <tr
                  className="border-b hover:bg-green-100 cursor-pointer"
                  onClick={() => toggleRow(index)}
                >
                  <td className="px-4 py-2 flex justify-start items-center">
                    {(page - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-4 py-2 font-semibold w-1/5">{item.name}</td>
                  <td className="px-4 py-2 font-medium hidden sm:table-cell w-44">
                    {Array.isArray(item.top_3_coins) && item.top_3_coins.length > 0 ? (
                      item.top_3_coins.map((coin, index) => (
                        <img
                          key={index}
                          src={coin}
                          alt={`Coin ${index + 1}`}
                          className="inline-block w-8 h-8 mr-1 rounded-full"
                        />
                      ))
                    ) : (
                      <span>No image</span>
                    )}
                    {item.top_3_coins_ids}
                  </td>
                  <td
                    className={`px-4 py-3 hidden md:table-cell ${
                      item.market_cap_change_24h < 0
                        ? "text-red-500"
                        : "text-emerald-500"
                    }`}
                  >
                    {item.market_cap_change_24h !== null 
                      ? `${item.market_cap_change_24h.toFixed(2)}% ${
                          item.market_cap_change_24h < 0 ? "▼" : "▲"
                        }`
                      : "No data"}
                  </td>
                  <td className="px-4 py-2 text-gray-950 hidden lg:table-cell">
                    {item.market_cap !== null 
                      ? item.market_cap.toLocaleString() 
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2 text-gray-700 hidden lg:table-cell">
                    {item.volume_24h !== null 
                      ? item.volume_24h.toLocaleString() 
                      : "No data"}
                  </td>
                  <td className="px-4 py-2 sm:hidden">
                    <button
                      onClick={() => toggleRow(index)}
                      className="text-emerald-500 hover:text-emerald-700"
                    >
                      {expandedRow === index ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </td>
                </tr>

                {/* ردیف بازشونده برای جزئیات بیشتر در موبایل */}
                {expandedRow === index && (
                  <tr className="sm:hidden">
                    <td colSpan="7" className="px-4 py-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold">Coins:</p>
                          {Array.isArray(item.top_3_coins) && item.top_3_coins.length > 0 ? (
                            item.top_3_coins.map((coin, index) => (
                              <img
                                key={index}
                                src={coin}
                                alt={`Coin ${index + 1}`}
                                className="inline-block w-8 h-8 mr-1 rounded-full"
                              />
                            ))
                          ) : (
                            <span>No image</span>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold">24h Change:</p>
                          <p
                            className={`${
                              item.market_cap_change_24h < 0
                                ? "text-red-500"
                                : "text-emerald-500"
                            }`}
                          >
                            {item.market_cap_change_24h !== null 
                              ? `${item.market_cap_change_24h.toFixed(2)}% ${
                                  item.market_cap_change_24h < 0 ? "▼" : "▲"
                                }`
                              : "No data"}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold">Market Cap:</p>
                          <p>{item.market_cap !== null 
                              ? item.market_cap.toLocaleString() 
                              : "N/A"}</p>
                        </div>
                        <div>
                          <p className="font-semibold">24h Volume:</p>
                          <p>{item.volume_24h !== null 
                              ? item.volume_24h.toLocaleString() 
                              : "No data"}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <PaginationControlled
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}

export default CategoryTable;