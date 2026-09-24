import { useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CoinTable from '../components/CoinTable';
import PaginationControlled from '../components/Pagination';
import PageHeader from '../components/ui/PageHeader';
import { useCoinsListQuery } from '../queries/useQuery';
import { CRYPTO_TABS } from '../constants/tabs';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function TopGainersPage() {
  const [page, setPage] = useState(1);

  const { data = [], isLoading, isError, error } = useCoinsListQuery(page);

  // Copy + sort instead of mutating the query cache.
  const topGainers = useMemo(
    () => [...data].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h),
    [data]
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="w-full max-w-7xl mx-auto px-4 md:px-0 flex-1">
        <div className="mt-3">
          <PageHeader
            title="Top Gainers"
            subtitle="Cryptocurrencies with the highest daily percentage change in price over the last 24 hours."
            tabs={CRYPTO_TABS}
            loading={isLoading}
          />
        </div>

        {isError ? (
          <div className="text-center text-red-500 p-8">Error: {error?.message || 'Failed to load coins'}</div>
        ) : isLoading ? (
          <div className="w-full p-4">
            <Skeleton count={10} height={50} className="mb-2" />
          </div>
        ) : (
          <div className="w-full flex flex-col p-4">
            <CoinTable coins={topGainers} />
            <PaginationControlled page={page} setPage={setPage} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default TopGainersPage;
