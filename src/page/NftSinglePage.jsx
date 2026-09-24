import React from 'react';
import { useParams } from 'react-router-dom';
import { useNftDetailsQuery } from '../queries/useQuery';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/ui/Card';
import { useDispatch, useSelector } from 'react-redux';
import { addToNftList, removeFromNftList } from '../features/nftSlice';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Strip HTML tags and entities from API descriptions.
const cleanDescription = (text) => {
  if (!text) return '';
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

const formatNumber = (num) => {
  if (num === null || num === undefined || Number.isNaN(num)) return 'N/A';
  return num.toLocaleString();
};

const percentClass = (num) => (num >= 0 ? 'text-emerald-500' : 'text-red-500');

function NftSinglePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const nfts = useSelector((state) => state.nfts);

  const { data: nft, isLoading, isError, error } = useNftDetailsQuery(id);

  const [isExpanded, setIsExpanded] = React.useState(false);

  const isInNftList = (nftId) => nfts.some((item) => item.id === nftId);

  const handleNftListAction = (nft) => {
    if (isInNftList(nft.id)) {
      dispatch(removeFromNftList(nft));
    } else {
      const formattedNft = {
        id: nft.id,
        name: nft.name,
        symbol: nft.symbol,
        thumb: nft.image?.small,
        floor_price: nft.floor_price?.native_currency,
        floor_price_24h_percentage_change: nft.floor_price_24h_percentage_change?.native_currency,
      };
      dispatch(addToNftList(formattedNft));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Skeleton height={400} className="mb-8" />
          <Skeleton count={10} height={40} className="mb-4" />
        </div>
        <Footer />
      </div>
    );
  }

  if (isError || !nft) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-red-500">
          Error loading NFT data: {error?.message || 'Not found'}
        </div>
        <Footer />
      </div>
    );
  }

  const floorChange7d = nft.floor_price_7d_percentage_change?.native_currency;
  const floorChange14d = nft.floor_price_14d_percentage_change?.native_currency;
  const floorChange30d = nft.floor_price_30d_percentage_change?.native_currency;
  const floorChange60d = nft.floor_price_60d_percentage_change?.native_currency;
  const floorChange1y = nft.floor_price_1y_percentage_change?.native_currency;

  const priceChanges = [
    { label: '7d', value: floorChange7d },
    { label: '14d', value: floorChange14d },
    { label: '30d', value: floorChange30d },
    { label: '60d', value: floorChange60d },
    { label: '1y', value: floorChange1y },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="relative">
          {nft.banner_image && (
            <img src={nft.banner_image} alt={nft.name} className="w-full h-64 object-cover rounded-xl border-2 border-emerald-300" />
          )}
          {nft.image?.small_2x && (
            <img
              src={nft.image.small_2x}
              alt={nft.name}
              className="absolute -bottom-16 left-8 w-32 h-32 rounded-xl border-4 border-emerald-300 shadow-lg bg-white"
            />
          )}
        </div>

        {/* Title and Actions */}
        <div className="mt-20 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-display">{nft.name}</h1>
            <p className="text-gray-600">{nft.symbol}</p>
          </div>
          <button
            onClick={() => handleNftListAction(nft)}
            className={`px-6 py-2 rounded-full text-white ${
              isInNftList(nft.id)
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-emerald-500 hover:bg-emerald-600'
            } transition-colors duration-300`}
          >
            {isInNftList(nft.id) ? 'Remove from NFT List' : 'Add to NFT List'}
          </button>
        </div>

        {/* Description with Read More button */}
        <div className="mt-6">
          <p className={`text-gray-700 leading-relaxed description-text1 ${isExpanded ? 'expanded' : 'collapsed'}`}>
            {cleanDescription(nft.description) || 'No description available.'}
          </p>
          <button
            className="my-2 px-4 py-2 bg-emerald-500 text-white rounded-lg shadow hover:bg-emerald-600 transition-colors"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        </div>

        {/* Price History Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Price History</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Price Changes */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Price Changes</h3>
              <div className="space-y-3">
                {priceChanges.map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-gray-600">{label}</span>
                    <span className={`font-medium ${value !== undefined && value !== null ? percentClass(value) : 'text-gray-400'}`}>
                      {value !== undefined && value !== null ? `${value.toFixed(2)}%` : 'N/A'}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* All Time High */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">All Time High</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-500 text-sm">ATH Price</p>
                  <p className="text-xl font-bold text-gray-900">
                    {nft.ath?.native_currency ?? 'N/A'} {nft.native_currency_symbol}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Change from ATH</p>
                  <p className={percentClass(nft.ath_change_percentage?.native_currency ?? 0)}>
                    {nft.ath_change_percentage?.native_currency?.toFixed(2) ?? 'N/A'}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">ATH Date</p>
                  <p>{nft.ath_date?.native_currency ? new Date(nft.ath_date.native_currency).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>
            </Card>

            {/* Trading Stats */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Trading Stats (24h)</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-500 text-sm">Sales</p>
                  <p className="text-xl font-bold text-gray-900">{formatNumber(nft.one_day_sales)}</p>
                  <p className={`text-sm ${percentClass(nft.one_day_sales_24h_percentage_change ?? 0)}`}>
                    {nft.one_day_sales_24h_percentage_change?.toFixed(2) ?? 'N/A'}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Average Sale Price</p>
                  <p className="text-xl font-bold text-gray-900">
                    {nft.one_day_average_sale_price?.toFixed(4) ?? 'N/A'} {nft.native_currency_symbol}
                  </p>
                  <p className={`text-sm ${percentClass(nft.one_day_average_sale_price_24h_percentage_change ?? 0)}`}>
                    {nft.one_day_average_sale_price_24h_percentage_change?.toFixed(2) ?? 'N/A'}%
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-gray-500 text-sm">Floor Price</h3>
            <p className="text-2xl font-bold text-gray-900">
              {nft.floor_price?.native_currency ?? 'N/A'} {nft.native_currency_symbol}
            </p>
            <p className={`text-sm ${percentClass(nft.floor_price_24h_percentage_change?.native_currency ?? 0)}`}>
              {nft.floor_price_24h_percentage_change?.native_currency?.toFixed(2) ?? 'N/A'}% (24h)
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-gray-500 text-sm">Market Cap</h3>
            <p className="text-2xl font-bold text-gray-900">
              {formatNumber(nft.market_cap?.native_currency)} {nft.native_currency_symbol}
            </p>
            <p className={`text-sm ${percentClass(nft.market_cap_24h_percentage_change?.native_currency ?? 0)}`}>
              {nft.market_cap_24h_percentage_change?.native_currency?.toFixed(2) ?? 'N/A'}% (24h)
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-gray-500 text-sm">24h Volume</h3>
            <p className="text-2xl font-bold text-gray-900">
              {formatNumber(nft.volume_24h?.native_currency)} {nft.native_currency_symbol}
            </p>
            <p className={`text-sm ${percentClass(nft.volume_24h_percentage_change?.native_currency ?? 0)}`}>
              {nft.volume_24h_percentage_change?.native_currency?.toFixed(2) ?? 'N/A'}% (24h)
            </p>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Collection Info</h3>
            <div className="space-y-2 text-gray-700">
              <p>Total Supply: {formatNumber(nft.total_supply)}</p>
              <p>Unique Holders: {formatNumber(nft.number_of_unique_addresses)}</p>
              <p>Contract Address: <span className="text-sm text-emerald-600 break-all">{nft.contract_address}</span></p>
              <p>Platform: {nft.asset_platform_id}</p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Links</h3>
            <div className="flex flex-wrap gap-4">
              {nft.links?.homepage && (
                <a href={nft.links.homepage} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-800 font-medium">
                  Website
                </a>
              )}
              {nft.links?.twitter && (
                <a href={nft.links.twitter} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-800 font-medium">
                  Twitter
                </a>
              )}
              {nft.links?.discord && (
                <a href={nft.links.discord} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-800 font-medium">
                  Discord
                </a>
              )}
              {nft.explorers?.map((explorer, index) => (
                <a key={index} href={explorer.link} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-800 font-medium">
                  {explorer.name}
                </a>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NftSinglePage;
