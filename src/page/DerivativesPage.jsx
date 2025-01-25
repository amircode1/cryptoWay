import React, { useState } from 'react';
import { useDerivativesQuery } from '../queries/useQuery';
import DerivativesTable from '../components/DerivativesTable';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function DerivativesPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useDerivativesQuery(page);

  return (
    <div className="flex justify-center flex-col mx-auto max-w-7xl">
      <Navbar />
      <div className="border-b-2 border-emerald-300">
        {isLoading ? (
          <>
            <Skeleton height={40} className="mb-4" />
            <Skeleton count={2} className="mb-2" />
          </>
        ) : (
          <>
            <h1 className="text-2xl md:text-3xl font-bold p-4">Top Derivatives Contracts</h1>
            <p className="text-sm md:text-base text-gray-500 px-4 pb-4 font-semibold">
              View the latest derivatives contracts sorted by 24h trading volume.
            </p>
          </>
        )}
      </div>
      
      <div className="flex flex-row flex-wrap gap-2 md:gap-4 justify-start items-start m-2 w-full">
        <Link to="/exchanges" className="text-sm md:text-base text-emerald-600 hover:text-emerald-700 hover:bg-emerald-200 p-2 font-sans font-bold rounded transition duration-200 ease-in-out transform hover:scale-105">
          Crypto Exchanges
        </Link>
        <Link to="/dex" className="text-sm md:text-base text-emerald-600 hover:text-emerald-700 hover:bg-emerald-200 p-2 font-sans font-bold rounded transition duration-200 ease-in-out transform hover:scale-105">
          Decentralized Exchanges
        </Link>
        <Link to="/derivatives" className="text-sm md:text-base text-emerald-600 hover:text-emerald-700 hover:bg-emerald-200 p-2 font-sans font-bold rounded transition duration-200 ease-in-out transform hover:scale-105">
          Derivatives
        </Link>
      </div>

      {isLoading ? (
        <div className="w-full">
          <Skeleton count={10} height={50} className="mb-2" />
        </div>
      ) : isError ? (
        <div className="text-center text-red-500 p-4">Error: {error.message}</div>
      ) : (
        <div className="w-full overflow-x-auto">
          <DerivativesTable data={data} page={page} setPage={setPage} />
        </div>
      )}
      
      <Footer />
    </div>
  );
}

export default DerivativesPage;
