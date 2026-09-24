import { useState, useMemo } from 'react';
import CryptoTable from '../components/Table';
import Navbar from '../components/Navbar';
import MarketCapCard from '../components/MarketCapCard';
import NewsCards from '../components/NewsCard';
import Footer from '../components/Footer';
import CardTrending from '../components/CardTrending';
import TickerMarquee from '../components/TickerMarquee';
import ChangeBadge from '../components/ui/ChangeBadge';
import { useCoinsListQuery, useMarketCapQuery, useTrendingCoinsQuery, useGlobalDataQuery } from '../queries/useQuery';
import Modal from '../components/Modal';
import { formatCompact } from '../utils/format';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function HomePage() {
  const [page, setPage] = useState(1);
  const [isErrorModalDismissed, setIsErrorModalDismissed] = useState(false);

  const { data: coinsData = [], isLoading: coinsLoading } = useCoinsListQuery(page);
  const { data: marketCapData = [], isLoading: marketCapLoading, isError: marketCapError, error: marketCapErr } = useMarketCapQuery();
  const { data: trendingCoinsData = { coins: [] }, isLoading: trendingLoading, isError: trendingError, error: trendingErr } = useTrendingCoinsQuery();
  const { data: globalData } = useGlobalDataQuery();

  const topGainers = useMemo(() => {
    return [...trendingCoinsData.coins]
      .sort((a, b) => (b.item.data.price_change_percentage_24h.usd || 0) - (a.item.data.price_change_percentage_24h.usd || 0))
      .slice(0, 5);
  }, [trendingCoinsData]);

  const isLoading = marketCapLoading || trendingLoading || coinsLoading;
  const isError = marketCapError || trendingError;

  const errorMessages = [];
  if (marketCapError) errorMessages.push(marketCapErr?.message);
  if (trendingError) errorMessages.push(trendingErr?.message);

  const isErrorModalOpen = isError && !isErrorModalDismissed;

  const heroStats = [
    { label: 'Global Market Cap', value: globalData ? `$${formatCompact(globalData.total_market_cap?.usd)}` : '—' },
    { label: '24h Trading Volume', value: globalData ? `$${formatCompact(globalData.total_volume?.usd)}` : '—' },
    { label: 'BTC Dominance', value: globalData ? `${(globalData.market_cap_percentage?.btc ?? 0).toFixed(1)}%` : '—' },
    { label: 'ETH Dominance', value: globalData ? `${(globalData.market_cap_percentage?.eth ?? 0).toFixed(1)}%` : '—' },
  ];

  const globalChange = globalData?.market_cap_change_percentage_24h_usd;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 pt-10 pb-4 md:pt-14">
          <div className="fade-in-up">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-emerald-50 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              Live Market Data
            </span>
            <h1 className="mt-4 text-3xl md:text-5xl font-bold font-display leading-tight">
              Today&apos;s Cryptocurrency Prices
              <span className="block mt-1 bg-gradient-to-r from-emerald-200 to-white bg-clip-text text-transparent">
                by Market Cap
              </span>
            </h1>
            <p className="mt-4 text-emerald-100/90 max-w-2xl text-sm md:text-base">
              Track prices, 24h changes, volumes and market caps for the top cryptocurrencies in real time.
            </p>

            {/* Global stats */}
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-3"
                >
                  <div className="text-[11px] md:text-xs text-emerald-200 font-medium uppercase tracking-wide">{stat.label}</div>
                  <div className="mt-1 text-lg md:text-2xl font-bold font-display tabular-nums">{stat.value}</div>
                </div>
              ))}
            </div>

            {globalChange !== undefined && (
              <div className="mt-4 flex items-center gap-2 text-sm text-emerald-100">
                <span>Market cap (24h):</span>
                <ChangeBadge value={globalChange} className="bg-white/20 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Ticker */}
        <div className="mt-8">
          <TickerMarquee coins={marketCapData} />
        </div>
      </section>

      <main className="w-full max-w-7xl mx-auto px-4 md:px-0 flex-1">
        {/* Cards row */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 p-4">
          {isLoading ? (
            <>
              <Skeleton height={220} />
              <Skeleton height={220} />
              <Skeleton height={220} />
              <Skeleton height={220} />
              <Skeleton height={220} />
            </>
          ) : (
            <>
              <CardTrending title="Trending Coins" coins={trendingCoinsData.coins.slice(0, 5)} />
              <CardTrending title="Top Gainers" coins={topGainers.slice(0, 5)} />
              <MarketCapCard data={marketCapData.slice(0, 10)} label="Top 10 Market Cap" color="rgba(16, 185, 129, 1)" />
              <MarketCapCard data={marketCapData.slice(10, 20)} label="Next 10 Market Cap" color="rgba(59, 130, 246, 1)" />
              <NewsCards />
            </>
          )}
        </div>

        <hr className="w-full border-t-2 border-emerald-300 my-5" />

        {/* Coins table */}
        {isLoading ? (
          <div className="w-full p-4">
            <Skeleton count={10} height={50} className="mb-2" />
          </div>
        ) : (
          <CryptoTable coins={coinsData} loading={coinsLoading} page={page} setPage={setPage} />
        )}
      </main>

      <Footer />

      {isErrorModalOpen && (
        <Modal isOpen={isErrorModalOpen} onClose={() => setIsErrorModalDismissed(true)}>
          <ul className="list-disc pl-6 text-gray-700 text-sm">
            {errorMessages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </Modal>
      )}
    </div>
  );
}

export default HomePage;
