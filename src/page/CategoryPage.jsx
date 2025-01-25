import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCategoriesQuery } from '../queries/useQuery'; // استفاده از useCategoriesQuery
import CategoryTable from '../components/CategoryTable';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function CategoryPage() {
  const { data: categories = [], isLoading, isError, error } = useCategoriesQuery();

  return (
    <div className="flex flex-col items-center min-w-full">
      <Navbar />
      <div className="w-full max-w-7xl my-3">
        {isLoading ? (
          <>
            <Skeleton height={40} width={300} className="mb-4" />
            <Skeleton count={3} className="mb-2" />
          </>
        ) : (
          <>
            <h1 className="text-2xl md:text-3xl font-bold text-start p-4 inline">
              Cryptocurrency Categories
            </h1>
            <p className='text-start p-4 font-semibold text-gray-500 text-sm md:text-base'>
              Cryptocurrencies can be categorized into several types based on their purpose and functionality. The main categories include coins like Bitcoin and Ethereum, which function as digital currencies, and tokens, which are used for specific platforms or utilities. Additionally, stablecoins aim to maintain a stable value, while privacy coins focus on enhanced transaction anonymity.
            </p>
          </>
        )}
      </div>
      <hr className="max-w-7xl w-full border-t-2 border-emerald-300 m-5 mt-1" />
      {isLoading ? (
        <div className="w-full max-w-7xl">
          <Skeleton count={10} height={50} className="mb-2" />
        </div>
      ) : isError ? (
        <div className="text-center text-red-500">Error: {error.message}</div>
      ) : !categories.length ? (
        <div className="text-center text-gray-500">No categories available.</div>
      ) : (
        <div className="w-full max-w-7xl overflow-x-auto">
          <CategoryTable data={categories} totalPages={Math.ceil(categories.length / 100)} />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default CategoryPage;