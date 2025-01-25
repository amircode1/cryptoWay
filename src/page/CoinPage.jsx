import React from 'react';
import DOMPurify from 'dompurify';
import { useCoinsQuery } from '../queries/useQuery';
import { useParams } from 'react-router-dom';
import Chart from '../components/Chart';
import Sentiment from '../components/Sentiment';
import MarketTable from '../components/MarketTable';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './style.css';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function CoinsPage() {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { web_slug } = useParams();
  const { data: coin, isLoading, isError, error } = useCoinsQuery(web_slug);

  console.log('Component render:', { web_slug, isLoading, isError, coin });

  // ساده‌سازی توابع فرمت‌کننده
  const formatPrice = (price) => {
    if (!price) return '0.00';
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const formatNumber = (num) => {
    if (!num) return '0';
    return num.toLocaleString('en-US');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          {/* Header Skeleton */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-2 border-emerald-300">
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

            {/* Market Stats Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="p-4 rounded-lg border-2 border-emerald-300">
                  <Skeleton width={100} />
                  <Skeleton width={150} height={28} />
                </div>
              ))}
            </div>

            {/* Technical Info Skeleton */}
            <div className="mt-6 p-4 rounded-lg border-2 border-emerald-300">
              <Skeleton width={200} height={24} className="mb-3" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton count={2} />
              </div>
            </div>

            {/* Developer Stats Skeleton */}
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
          </div>

          {/* Chart and Description Skeleton */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/3">
              <div className="bg-white rounded-lg shadow-md p-6 border-2 border-emerald-300">
                <Skeleton height={400} />
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 border-2 border-emerald-300">
                <Skeleton width={150} height={24} className="mb-4" />
                <Skeleton count={4} />
              </div>
            </div>
          </div>

          {/* Markets Skeleton */}
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-2 border-emerald-300">
              <Skeleton width={150} height={24} className="mb-4" />
              <Skeleton height={200} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (isError) {
    console.error('Error in component:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">
          Error: {error?.message || 'Failed to load coin data'}
        </div>
      </div>
    );
  }

  const renderSanitizedHTML = (htmlContent) => {
    const sanitizedContent = DOMPurify.sanitize(htmlContent);
    return { __html: sanitizedContent };
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8">
        {/* Coin Header Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-2 border-emerald-300">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={coin.image?.large}
                alt={coin.name}
                className="w-16 h-16 rounded-full border-2 border-emerald-300"
              />
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold">
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
                <div className="flex items-center mt-2">
                  <div className="text-sm text-emerald-600">
                    Rank #{coin.market_cap_rank}
                  </div>
                  {coin.genesis_date && (
                    <div className="text-sm text-emerald-600 ml-4">
                      Genesis: {new Date(coin.genesis_date).toLocaleDateString()}
                    </div>
                  )}
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {coin.categories?.map((category) => (
                    <span key={category} className="px-2 py-1 text-xs bg-emerald-100 text-emerald-800 rounded-full">
                      {category}
                    </span>
                  ))}
                </div>

                {/* Social Stats */}
                <div className="flex items-center gap-4 mt-2">
                  {coin.community_data?.twitter_followers > 0 && (
                    <span className="text-sm text-gray-600">
                      Twitter: {(coin.community_data.twitter_followers / 1000000).toFixed(1)}M followers
                    </span>
                  )}
                </div>

                {/* Quick Links */}
                <div className="flex gap-3 mt-2">
                  {coin.links?.homepage[0] && (
                    <a 
                      href={coin.links.homepage[0]} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      Website
                    </a>
                  )}
                  {coin.links?.blockchain_site[0] && (
                    <a 
                      href={coin.links.blockchain_site[0]} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      Explorer
                    </a>
                  )}
                  {coin.links?.whitepaper && (
                    <a 
                      href={coin.links.whitepaper} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      Whitepaper
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="text-3xl font-bold">
                ${formatPrice(coin.market_data?.current_price?.usd)}
              </div>
              <div className={`text-sm font-semibold ${
                coin.market_data?.price_change_percentage_24h >= 0
                  ? 'text-emerald-500'
                  : 'text-red-500'
              }`}>
                {coin.market_data?.price_change_percentage_24h?.toFixed(2)}%
                <span className="text-gray-500 ml-1">24h</span>
              </div>
            </div>
          </div>

          {/* Market Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-lg border-2 border-emerald-300">
              <div className="text-sm text-emerald-600">Market Cap</div>
              <div className="text-lg font-semibold">
                ${formatNumber(coin.market_data?.market_cap?.usd)}
              </div>
            </div>
            <div className="p-4 rounded-lg border-2 border-emerald-300">
              <div className="text-sm text-emerald-600">24h Volume</div>
              <div className="text-lg font-semibold">
                ${formatNumber(coin.market_data?.total_volume?.usd)}
              </div>
            </div>
            <div className="p-4 rounded-lg border-2 border-emerald-300">
              <div className="text-sm text-emerald-600">Circulating Supply</div>
              <div className="text-lg font-semibold">
                {formatNumber(coin.market_data?.circulating_supply)} {coin.symbol?.toUpperCase()}
              </div>
            </div>
            <div className="p-4 rounded-lg border-2 border-emerald-300">
              <div className="text-sm text-emerald-600">Total Supply</div>
              <div className="text-lg font-semibold">
                {formatNumber(coin.market_data?.total_supply)} {coin.symbol?.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Technical Info */}
          <div className="mt-6 p-4 rounded-lg border-2 border-emerald-300">
            <h3 className="text-lg font-semibold mb-3">Technical Information</h3>
            <div className="grid grid-cols-2 gap-4">
              {coin.hashing_algorithm && (
                <div>
                  <span className="text-gray-600">Hash Algorithm:</span>
                  <span className="ml-2">{coin.hashing_algorithm}</span>
                </div>
              )}
              {coin.block_time_in_minutes && (
                <div>
                  <span className="text-gray-600">Block Time:</span>
                  <span className="ml-2">{coin.block_time_in_minutes} minutes</span>
                </div>
              )}
            </div>
          </div>

          {/* Developer Stats */}
          <div className="mt-6 p-4 rounded-lg border-2 border-emerald-300">
            <h3 className="text-lg font-semibold mb-3">Developer Activity</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">GitHub Stars</p>
                <p className="font-semibold">{coin.developer_data?.stars?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Forks</p>
                <p className="font-semibold">{coin.developer_data?.forks?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Contributors</p>
                <p className="font-semibold">{coin.developer_data?.pull_request_contributors}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Issues</p>
                <p className="font-semibold">{coin.developer_data?.total_issues}</p>
              </div>
              <div>
                <p className="text-gray-600">Closed Issues</p>
                <p className="font-semibold">{coin.developer_data?.closed_issues}</p>
              </div>
              <div>
                <p className="text-gray-600">Recent Commits</p>
                <p className="font-semibold">{coin.developer_data?.commit_count_4_weeks}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart and Description Section */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 border-2 border-emerald-300">
              <h2 className="text-xl font-semibold mb-4">Price Chart</h2>
              <Chart coinId={web_slug} />
            </div>
          </div>
          
          <div className="w-full md:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 border-2 border-emerald-300">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
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
            </div>
          </div>
        </div>

        {/* Market Data */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-md p-4 border-2 border-emerald-300">
            <h2 className="text-xl font-semibold mb-4">Markets</h2>
            <div className="overflow-x-auto">
              <MarketTable markets={coin.tickers} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CoinsPage;
