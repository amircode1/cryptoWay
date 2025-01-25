import React from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import DexTable from '../components/DexTable';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function DexPage() {
  const apikey = import.meta.env.VITE_API_KEY_CMP;
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <div className="flex justify-center flex-col mx-auto max-w-7xl px-4 md:px-0">
      <Navbar />
      <div className="border-b-2 border-emerald-300">
        {isLoading ? (
          <>
            <Skeleton height={40} className="mb-4" />
            <Skeleton count={2} className="mb-2" />
          </>
        ) : (
          <>
            <h1 className="text-2xl md:text-3xl font-bold p-4">Top Decentralized Exchange Spot Pairs</h1>
            <p className="text-sm md:text-base text-gray-500 px-4 pb-4 font-semibold">
              View the latest decentralized exchange spot pairs sorted by 24h trading volume.
            </p>
          </>
        )}
      </div>
      
      <div className="flex flex-row flex-wrap gap-2 md:gap-4 justify-start items-start m-2 w-full">
        <Link
          to="/exchanges"
          className="text-sm md:text-base text-emerald-600 hover:text-emerald-700 hover:bg-emerald-200 p-2 font-sans font-bold rounded transition duration-200 ease-in-out transform hover:scale-105"
        >
          Crypto Exchanges
        </Link>
        <Link
          to="/dex"
          className="text-sm md:text-base text-emerald-600 hover:text-emerald-700 hover:bg-emerald-200 p-2 font-sans font-bold rounded transition duration-200 ease-in-out transform hover:scale-105"
        >
          Decentralized Exchanges
        </Link>
        <Link
          to="/derivatives"
          className="text-sm md:text-base text-emerald-600 hover:text-emerald-700 hover:bg-emerald-200 p-2 font-sans font-bold rounded transition duration-200 ease-in-out transform hover:scale-105"
        >
          Derivatives
        </Link>
      </div>
      
      {isLoading ? (
        <div className="w-full">
          <Skeleton count={10} height={50} className="mb-2" />
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <DexTable data={data} />
        </div>
      )}
      
      <Footer />
    </div>
  );
}

export default DexPage;
