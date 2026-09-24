import { useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NftTable from '../components/NftTable';
import { useNFTQuery, useTrendingCoinsQuery } from '../queries/useQuery';
import CardNftTrending from '../components/CardNftTrending';
import PageHeader from '../components/ui/PageHeader';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function NftPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useNFTQuery(page);
  const { data: trending, isLoading: trendingLoading, isError: trendingError } = useTrendingCoinsQuery();

  const TopGainer = useMemo(() => {
    if (!trending || !trending.nfts) return [];
    return [...trending.nfts]
      .sort((a, b) => (b.floor_price_24h_percentage_change || 0) - (a.floor_price_24h_percentage_change || 0))
      .slice(0, 5);
  }, [trending]);

  const TopLoser = useMemo(() => {
    if (!trending || !trending.nfts) return [];
    return [...trending.nfts]
      .sort((a, b) => (a.floor_price_24h_percentage_change || 0) - (b.floor_price_24h_percentage_change || 0))
      .slice(0, 5);
  }, [trending]);

  const loading = isLoading || trendingLoading;

  if (isError || trendingError) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="text-center text-red-500 p-8">Error loading NFT data. Please try again later.</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="w-full max-w-7xl mx-auto px-4 md:px-0 flex-1 mt-3 fade-in-up">
        <PageHeader
          title="Top NFT Collection Prices Ranked by Market Cap"
          subtitle="The global NFT market cap today is $7.69 Billion, a 6.0% change in the last 24 hours."
          loading={isLoading}
        />

        {/* Trending NFT cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
          {loading ? (
            <>
              <Skeleton height={260} />
              <Skeleton height={260} />
              <Skeleton height={260} />
            </>
          ) : (
            <>
              <CardNftTrending title="Top Trending NFT Collections" coins={trending?.nfts?.slice(0, 5) || []} />
              <CardNftTrending title="Top Gainer NFT Collections" coins={TopGainer} />
              <CardNftTrending title="Top Loser NFT Collections" coins={TopLoser} />
            </>
          )}
        </div>

        {/* NFT table */}
        {loading ? (
          <div className="w-full p-4">
            <Skeleton count={10} height={50} className="mb-2" />
          </div>
        ) : (
          <div className="w-full p-4">
            <NftTable data={data} page={page} setPage={setPage} loading={false} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default NftPage;
