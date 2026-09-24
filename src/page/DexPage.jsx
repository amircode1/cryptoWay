import Navbar from '../components/Navbar';
import DexTable from '../components/DexTable';
import Footer from '../components/Footer';
import PageHeader from '../components/ui/PageHeader';
import { EXCHANGE_TABS } from '../constants/tabs';

function DexPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="w-full max-w-7xl mx-auto px-4 md:px-0 flex-1 mt-3 fade-in-up">
        <PageHeader
          title="Top Decentralized Exchange Spot Pairs"
          subtitle="View the latest decentralized exchange spot pairs sorted by 24h trading volume."
          tabs={EXCHANGE_TABS}
        />

        <div className="w-full overflow-x-auto p-4">
          <DexTable data={[]} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default DexPage;
