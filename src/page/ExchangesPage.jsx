import Navbar from '../components/Navbar';
import ExchangesTable from '../components/ExchangesTable';
import Footer from '../components/Footer';
import PageHeader from '../components/ui/PageHeader';
import { EXCHANGE_TABS } from '../constants/tabs';

function ExchangesPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="w-full max-w-7xl mx-auto px-4 md:px-0 flex-1 mt-3 fade-in-up">
        <PageHeader
          title="Top Crypto Exchanges Ranked by Trust Score"
          subtitle="As of today, we track 216 crypto exchanges with a total 24h trading volume of $119 Billion, a -28.83% change in the last 24 hours. Currently, the 3 largest cryptocurrency exchanges are Coinbase Exchange, OKX, and KuCoin. Total tracked crypto exchange reserves currently stand at $273 Billion."
          tabs={EXCHANGE_TABS}
        />

        <div className="w-full overflow-x-auto p-4">
          <ExchangesTable />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ExchangesPage;
