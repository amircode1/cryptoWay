import React from 'react';
import DOMPurify from 'dompurify';
import { useCoinsQuery } from '../queries/useQuery';
import { useParams } from 'react-router-dom';
import Chart from '../components/Chart';
import Sentiment from '../components/Sentiment';
import MarketTable from '../components/MarketTable';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import Chip from '../components/ui/Chip';
import ChangeBadge from '../components/ui/ChangeBadge';
import { formatPrice, formatNumber } from '../utils/format';
import './style.css';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function CoinsPage() {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { web_slug } = useParams();
  const { data: coin, isLoading, isError, error } = useCoinsQuery(web_slug);

  const renderSanitizedHTML = (htmlContent) => {
    const sanitizedContent = DOMPurify.sanitize(htmlContent || '');
    return { __html: sanitizedContent };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card className="p-6 mb-8 bg-gradient-to-b from-emerald-50/70 to-white">
            <div className="flex items-center space-x-4">
              <Skeleton circle width={64} height={64} />
              <div className="flex-1">
                <Skeleton width={200} height={32} />
                <div className="mt-2">
                  <Skeleton width={150} />
                </div>
              </div>
              <div className="text-right">
                <Skeleton width={150} height={40} />
                <Skeleton width={100} />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="p-4 rounded-lg border-2 border-emerald-300">
                  <Skeleton width={100} />
                  <Skeleton width={150} height={28} />
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg border-2 border-emerald-300">
              <Skeleton width={200} height={24} className="mb-3" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton count={2} />
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg border-2 border-emerald-300">
              <Skeleton width={200} height={24} className="mb-3" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i}>
                    <Skeleton count={2} />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/3">
              <Card className="p-6">
                <Skeleton height={400} />
              </Card>
            </div>
            <div className="w-full md:w-1/3">
              <Card className="p-6">
                <Skeleton width={150} height={24} className="mb-4" />
                <Skeleton count={4} />
              </Card>
            </div>
          </div>

          <div className="mt-8">
            <Card className="p-6">
              <Skeleton width={150} height={24} className="mb-4" />
              <Skeleton height={200} />
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center text-red-500">
          Error: {error?.message || 'Failed to load coin data'}
        </div>
        <Footer />
      </div>
    );
  }

  const marketData = coin.market_data || {};
  const priceChange24h = marketData.price_change_percentage_24h;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4 md:px-0 fade-in-up">
        {/* Coin Header Section */}
        <Card className="p-6 mb-8 bg-gradient-to-b from-emerald-50/70 to-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4">
              {coin.image?.large && (
                <img src={coin.image.large} alt={coin.name} className="w-16 h-16 rounded-full border-2 border-emerald-300" />
              )}
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-bold font-display">
                    {coin.name}
                    <span className="text-gray-500 ml-2">({coin.symbol?.toUpperCase()})</span>
                  </h1>
                  <Sentiment
                    sentiment={{
                      bullish: coin.sentiment_votes_up_percentage,
                      bearish: coin.sentiment_votes_down_percentage,
                    }}
                    compact={true}
                  />
                </div>
                <div className="flex items-center flex-wrap mt-2">
                  <div className="text-sm text-emerald-600 font-medium">Rank #{coin.market_cap_rank}</div>
                  {coin.genesis_date && (
                    <div className="text-sm text-emerald-600 ml-4">
                      Genesis: {new Date(coin.genesis_date).toLocaleDateString()}
                    </div>
                  )}
                </div>

                {coin.categories?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {coin.categories.slice(0, 6).map((category) => (
                      <Chip key={category}>{category}</Chip>
                    ))}
                  </div>
                )}

                {coin.community_data?.twitter_followers > 0 && (
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-gray-600">
                      Twitter: {(coin.community_data.twitter_followers / 1000000).toFixed(1)}M followers
                    </span>
                  </div>
                )}

                <div className="flex gap-3 mt-2 flex-wrap">
                  {coin.links?.homepage?.[0] && (
                    <a href={coin.links.homepage[0]} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-medium">
                      Website
                    </a>
                  )}
                  {coin.links?.blockchain_site?.[0] && (
                    <a href={coin.links.blockchain_site[0]} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-medium">
                      Explorer
                    </a>
                  )}
                  {coin.links?.whitepaper && (
                    <a href={coin.links.whitepaper} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 font-medium">
                      Whitepaper
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-0 md:text-right">
              <div className="text-3xl font-bold text-gray-900">
                ${formatPrice(marketData.current_price?.usd)}
              </div>
              <div className="flex items-center justify-end mt-2">
                <ChangeBadge value={priceChange24h} />
                <span className="text-gray-500 text-sm ml-2">24h</span>
              </div>
            </div>
          </div>

          {/* Market Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <StatCard label="Market Cap" value={`$${formatNumber(marketData.market_cap?.usd)}`} />
            <StatCard label="24h Volume" value={`$${formatNumber(marketData.total_volume?.usd)}`} />
            <StatCard label="Circulating Supply" value={`${formatNumber(marketData.circulating_supply)} ${coin.symbol?.toUpperCase()}`} />
            <StatCard label="Total Supply" value={`${formatNumber(marketData.total_supply)} ${coin.symbol?.toUpperCase()}`} />
          </div>

          {/* Technical Info */}
          {(coin.hashing_algorithm || coin.block_time_in_minutes) && (
            <div className="mt-6 p-4 rounded-lg border-2 border-emerald-300 bg-white">
              <h3 className="text-lg font-semibold mb-3">Technical Information</h3>
              <div className="grid grid-cols-2 gap-4">
                {coin.hashing_algorithm && (
                  <div>
                    <span className="text-gray-600">Hash Algorithm:</span>
                    <span className="ml-2 font-medium">{coin.hashing_algorithm}</span>
                  </div>
                )}
                {coin.block_time_in_minutes && (
                  <div>
                    <span className="text-gray-600">Block Time:</span>
                    <span className="ml-2 font-medium">{coin.block_time_in_minutes} minutes</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Developer Stats */}
          <div className="mt-6 p-4 rounded-lg border-2 border-emerald-300 bg-white">
            <h3 className="text-lg font-semibold mb-3">Developer Activity</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <StatCard label="GitHub Stars" value={formatNumber(coin.developer_data?.stars)} />
              <StatCard label="Forks" value={formatNumber(coin.developer_data?.forks)} />
              <StatCard label="Contributors" value={formatNumber(coin.developer_data?.pull_request_contributors)} />
              <StatCard label="Total Issues" value={formatNumber(coin.developer_data?.total_issues)} />
              <StatCard label="Closed Issues" value={formatNumber(coin.developer_data?.closed_issues)} />
              <StatCard label="Recent Commits" value={formatNumber(coin.developer_data?.commit_count_4_weeks)} />
            </div>
          </div>
        </Card>

        {/* Chart and Description Section */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 font-display">Price Chart</h2>
              <Chart coinId={web_slug} />
            </Card>
          </div>

          <div className="w-full md:w-1/3">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 font-display">Description</h2>
              <div
                className={`text-gray-700 description-text ${isExpanded ? 'expanded' : 'collapsed'} overflow-hidden transition-all duration-300`}
                dangerouslySetInnerHTML={renderSanitizedHTML(coin.description?.en)}
              />
              <button
                className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Show Less' : 'Read More'}
              </button>
            </Card>
          </div>
        </div>

        {/* Market Data */}
        <div className="mt-8">
          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4 font-display">Markets</h2>
            <div className="overflow-x-auto">
              <MarketTable markets={coin.tickers || []} />
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CoinsPage;
