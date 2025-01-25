import React, { useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NftTable from '../components/NftTable';
import { useNFTQuery, useTrendingCoinsQuery } from '../queries/useQuery';
import CardNftTrending from '../components/CardNftTrending';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function NftPage() {
    const [page, setPage] = useState(1);

    const { data, isLoading, isError } = useNFTQuery(page);
    const { data: trending, isLoading: trendingLoading, isError: trendingError } = useTrendingCoinsQuery();

    const TopGainer = useMemo(() => {
        if (!trending || !trending.nfts) return []; // بررسی وجود trending و trending.nfts
        return [...trending.nfts].sort((a, b) =>
            (b.floor_price_24h_percentage_change || 0) - (a.floor_price_24h_percentage_change || 0)
        ).slice(0, 5);
    }, [trending]);

    const TopLoser = useMemo(() => {
        if (!trending || !trending.nfts) return []; // بررسی وجود trending و trending.nfts
        return [...trending.nfts].sort((a, b) =>
            (a.floor_price_24h_percentage_change || 0) - (b.floor_price_24h_percentage_change || 0)
        ).slice(0, 5);
    }, [trending]);

    if (isLoading || trendingLoading) {
        return (
            <div className="w-full max-w-7xl mx-auto">
                <Navbar />
                <div className="w-full">
                    <Skeleton count={10} height={50} className="mb-2" />
                </div>
                <Footer />
            </div>
        );
    }

    if (isError || trendingError) {
        return <div>Error: {isError?.message || trendingError?.message}</div>;
    }

    return (
        <div className='w-full max-w-7xl mx-auto'>
            <Navbar />
            <div className="border-b-2 border-emerald-300 p-4">
                {isLoading ? (
                    <>
                        <Skeleton height={40} className="mb-4" />
                        <Skeleton count={2} className="mb-2" />
                    </>
                ) : (
                    <>
                        <h1 className="text-2xl md:text-3xl font-bold p-4">Top NFT Collection Prices Ranked by Market Cap</h1>
                        <p className="text-sm md:text-base text-gray-500 px-4 pb-4 font-semibold">
                            The global NFT market cap today is $7.69 Billion, a 6.0% change in the last 24 hours.
                        </p>
                    </>
                )}

                <div className='flex flex-col md:flex-row gap-6 md:gap-20 items-center justify-center'>
                    {isLoading || trendingLoading ? (
                        <>
                            <Skeleton height={200} width={300} className="mb-4" />
                            <Skeleton height={200} width={300} className="mb-4" />
                            <Skeleton height={200} width={300} className="mb-4" />
                        </>
                    ) : (
                        <>
                            <CardNftTrending title="Top Trending NFT Collections" coins={trending?.nfts?.slice(0, 5) || []} />
                            <CardNftTrending title="Top Gainer NFT Collections" coins={TopGainer} />
                            <CardNftTrending title="Top Loser NFT Collections" coins={TopLoser} />
                        </>
                    )}
                </div>
            </div>

            {isLoading ? (
                <div className="w-full">
                    <Skeleton count={10} height={50} className="mb-2" />
                </div>
            ) : (
                <NftTable data={data} page={page} setPage={setPage} />
            )}
            
            <Footer />
        </div>
    );
}

export default NftPage;