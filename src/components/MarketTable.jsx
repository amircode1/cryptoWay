import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PaginationControlled from "./Pagination";

const MarketTable = ({ markets = [] }) => {
  const [page, setPage] = useState(1); // State for managing the current page
  const [loading, setLoading] = useState(true); // Loading state
  const itemsPerPage = 10; // Rows per page

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // Skeleton loading state
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-700 ml-5">
          <thead className="bg-emerald-500 text-gray-50 uppercase font-semibold">
            <tr className="border-b">
              <th className="py-2 px-4">Exchange</th>
              <th className="py-2 px-4">Pair</th>
              <th className="py-2 px-4">Last Price</th>
              <th className="py-2 px-4 text-center">Volume (24h)</th>
              <th className="py-2 px-4 text-center">Trust Score</th>
              <th className="py-2 px-4">Trade URL</th>
            </tr>
          </thead>
          <tbody className="font-sans">
            {[...Array(10)].map((_, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="py-2 px-4">
                  <Skeleton width={120} />
                </td>
                <td className="py-2 px-4">
                  <Skeleton width={80} />
                </td>
                <td className="py-2 px-4">
                  <Skeleton width={60} />
                </td>
                <td className="py-2 px-4 text-center">
                  <Skeleton width={80} />
                </td>
                <td className="py-2 px-4 flex justify-center">
                  <Skeleton circle width={16} height={16} />
                </td>
                <td className="py-2 px-4">
                  <Skeleton width={80} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (!markets || markets.length === 0) {
    return <p className="text-gray-500 text-center">No market data available.</p>;
  }

  // Calculate the range of data for the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMarkets = markets.slice(startIndex, endIndex);

  // Calculate total number of pages
  const totalPages = Math.ceil(markets.length / itemsPerPage);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-700 ml-5">
          <thead className="bg-emerald-500 text-gray-50 uppercase font-semibold">
            <tr className="border-b">
              <th className="py-2 px-4">Exchange</th>
              <th className="py-2 px-4">Pair</th>
              <th className="py-2 px-4">Last Price</th>
              <th className="py-2 px-4 text-center">Volume (24h)</th>
              <th className="py-2 px-4 text-center">Trust Score</th>
              <th className="py-2 px-4">Trade URL</th>
            </tr>
          </thead>
          <tbody className="font-sans">
            {currentMarkets.map((market, index) => (
              <tr key={index} className="border-b border-gray-300 hover:bg-green-100">
                <td className="py-2 px-4">{market.market?.name || "N/A"}</td>
                <td className="py-2 px-4">{`${market.base}/${market.target}`}</td>
                <td className="py-2 px-4">${market.last?.toLocaleString() || "N/A"}</td>
                <td className="py-2 px-4 text-center">
                  ${market.volume?.toLocaleString() || "N/A"}
                </td>
                <td className="py-2 px-4 flex justify-center">
                  {market.trust_score ? (
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="py-2 px-4">
                  {market.trade_url ? (
                    <a
                      href={market.trade_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-500"
                    >
                      Trade
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <PaginationControlled setPage={setPage} page={page} totalPages={totalPages} />
    </>
  );
};

export default MarketTable;
