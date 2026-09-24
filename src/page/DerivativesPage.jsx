import { useState } from 'react';
import { useDerivativesQuery } from '../queries/useQuery';
import DerivativesTable from '../components/DerivativesTable';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/ui/PageHeader';
import { EXCHANGE_TABS } from '../constants/tabs';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function DerivativesPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useDerivativesQuery(page);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="w-full max-w-7xl mx-auto px-4 md:px-0 flex-1 mt-3 fade-in-up">
        <PageHeader
          title="Top Derivatives Contracts"
          subtitle="View the latest derivatives contracts sorted by 24h trading volume."
          tabs={EXCHANGE_TABS}
        />

        {isError ? (
          <div className="text-center text-red-500 p-8">Error: {error.message}</div>
        ) : isLoading ? (
          <div className="w-full p-4">
            <Skeleton count={10} height={50} className="mb-2" />
          </div>
        ) : (
          <div className="w-full overflow-x-auto p-4">
            <DerivativesTable data={data} page={page} setPage={setPage} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default DerivativesPage;
