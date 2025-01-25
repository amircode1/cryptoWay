import React from 'react';
import { useParams } from 'react-router-dom';
import { useNftDetailsQuery } from '../queries/useQuery';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { addToNftList, removeFromNftList } from '../features/nftSlice';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// تابع پاکسازی متن از HTML entities و کدها
const cleanDescription = (text) => {
  if (!text) return '';
  
  return text
    // تبدیل HTML entities به کاراکترهای معمولی
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    // حذف تگ‌های HTML
    .replace(/<[^>]*>/g, '')
    // حذف کدهای اضافی
    .replace(/\s+/g, ' ')
    // حذف فاصله‌های اضافی از ابتدا و انتها
    .trim();
};

function NftSinglePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const nfts = useSelector((state) => state.nfts);
  
  const { data: nft, isLoading, isError, error } = useNftDetailsQuery(id);

  const [isExpanded, setIsExpanded] = React.useState(false);

  const isInNftList = (nftId) => {
    return nfts.some((item) => item.id === nftId);
  };

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
        floor_price_24h_percentage_change: nft.floor_price_24h_percentage_change?.native_currency
      };
      dispatch(addToNftList(formattedNft));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Skeleton height={400} className="mb-8" />
          <Skeleton count={10} height={40} className="mb-4" />
        </div>
        <Footer />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-red-500">
          Error loading NFT data: {error?.message}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="relative">
          <img 
            src={nft.banner_image} 
            alt={nft.name} 
            className="w-full h-64 object-cover rounded-xl border-2 border-emerald-300"
          />
          <img 
            src={nft.image.small_2x} 
            alt={nft.name} 
            className="absolute -bottom-16 left-8 w-32 h-32 rounded-xl border-4 border-emerald-300 shadow-lg"
          />
        </div>

        {/* Title and Actions */}
        <div className="mt-20 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{nft.name}</h1>
            <p className="text-gray-600">{nft.symbol}</p>
          </div>
          <button
            onClick={() => handleNftListAction(nft)}
            className={`px-6 py-2 rounded-full text-white ${
              isInNftList(nft.id)
                ? 'bg-emerald-500 hover:bg-emerald-600'
                : 'bg-emerald-500 hover:bg-emerald-600'
            } transition-colors duration-300`}
          >
            {isInNftList(nft.id) ? 'Remove from NFT List' : 'Add to NFT List'}
          </button>
        </div>

        {/* Description with Read More button */}
        <div className="mt-6">
          <p className={`text-gray-700 leading-relaxed description-text1 ${isExpanded ? 'expanded' : 'collapsed'}`}>
            {cleanDescription(nft.description)}
          </p>
          <button
            className="my-2 px-4 py-2 bg-emerald-500 text-white rounded shadow hover:bg-emerald-600"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
        </div>

        {/* Price History Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Price History</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Price Changes */}
            <div className="p-6 border-2 border-emerald-300 rounded-lg">
              <h3 className="font-semibold mb-4">Price Changes</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>7d</span>
                  <span className={`${nft.floor_price_7d_percentage_change.native_currency > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {nft.floor_price_7d_percentage_change.native_currency.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>14d</span>
                  <span className={`${nft.floor_price_14d_percentage_change.native_currency > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {nft.floor_price_14d_percentage_change.native_currency.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>30d</span>
                  <span className={`${nft.floor_price_30d_percentage_change.native_currency > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {nft.floor_price_30d_percentage_change.native_currency.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>60d</span>
                  <span className={`${nft.floor_price_60d_percentage_change.native_currency > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {nft.floor_price_60d_percentage_change.native_currency.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>1y</span>
                  <span className={`${nft.floor_price_1y_percentage_change.native_currency > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {nft.floor_price_1y_percentage_change.native_currency.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            {/* All Time High */}
            <div className="p-6 border-2 border-emerald-300 rounded-lg">
              <h3 className="font-semibold mb-4">All Time High</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-500 text-sm">ATH Price</p>
                  <p className="text-xl font-bold">
                    {nft.ath.native_currency} {nft.native_currency_symbol}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Change from ATH</p>
                  <p className={`${nft.ath_change_percentage.native_currency > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {nft.ath_change_percentage.native_currency.toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">ATH Date</p>
                  <p>{new Date(nft.ath_date.native_currency).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Trading Stats */}
            <div className="p-6 border-2 border-emerald-300 rounded-lg">
              <h3 className="font-semibold mb-4">Trading Stats (24h)</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-500 text-sm">Sales</p>
                  <p className="text-xl font-bold">{nft.one_day_sales}</p>
                  <p className={`text-sm ${nft.one_day_sales_24h_percentage_change > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {nft.one_day_sales_24h_percentage_change.toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Average Sale Price</p>
                  <p className="text-xl font-bold">
                    {nft.one_day_average_sale_price.toFixed(4)} {nft.native_currency_symbol}
                  </p>
                  <p className={`text-sm ${nft.one_day_average_sale_price_24h_percentage_change > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {nft.one_day_average_sale_price_24h_percentage_change.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border-2 border-emerald-300 rounded-lg">
            <h3 className="text-gray-500 text-sm">Floor Price</h3>
            <p className="text-2xl font-bold">
              {nft.floor_price.native_currency} {nft.native_currency_symbol}
            </p>
            <p className={`text-sm ${nft.floor_price_24h_percentage_change.native_currency > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {nft.floor_price_24h_percentage_change.native_currency.toFixed(2)}% (24h)
            </p>
          </div>

          <div className="p-6 border-2 border-emerald-300 rounded-lg">
            <h3 className="text-gray-500 text-sm">Market Cap</h3>
            <p className="text-2xl font-bold">
              {nft.market_cap.native_currency.toLocaleString()} {nft.native_currency_symbol}
            </p>
            <p className={`text-sm ${nft.market_cap_24h_percentage_change.native_currency > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {nft.market_cap_24h_percentage_change.native_currency.toFixed(2)}% (24h)
            </p>
          </div>

          <div className="p-6 border-2 border-emerald-300 rounded-lg">
            <h3 className="text-gray-500 text-sm">24h Volume</h3>
            <p className="text-2xl font-bold">
              {nft.volume_24h.native_currency.toLocaleString()} {nft.native_currency_symbol}
            </p>
            <p className={`text-sm ${nft.volume_24h_percentage_change.native_currency > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {nft.volume_24h_percentage_change.native_currency.toFixed(2)}% (24h)
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border-2 border-emerald-300 rounded-lg">
            <h3 className="font-semibold mb-4">Collection Info</h3>
            <div className="space-y-2">
              <p>Total Supply: {nft.total_supply.toLocaleString()}</p>
              <p>Unique Holders: {nft.number_of_unique_addresses.toLocaleString()}</p>
              <p>Contract Address: <span className="text-sm text-emerald-600">{nft.contract_address}</span></p>
              <p>Platform: {nft.asset_platform_id}</p>
            </div>
          </div>

          <div className="p-6 border-2 border-emerald-300 rounded-lg">
            <h3 className="font-semibold mb-4">Links</h3>
            <div className="flex flex-wrap gap-4">
              {nft.links.homepage && (
                <a href={nft.links.homepage} target="_blank" rel="noopener noreferrer" 
                   className="text-emerald-500 hover:text-emerald-600">
                  Website
                </a>
              )}
              {nft.links.twitter && (
                <a href={nft.links.twitter} target="_blank" rel="noopener noreferrer"
                   className="text-emerald-500 hover:text-emerald-600">
                  Twitter
                </a>
              )}
              {nft.links.discord && (
                <a href={nft.links.discord} target="_blank" rel="noopener noreferrer"
                   className="text-emerald-500 hover:text-emerald-600">
                  Discord
                </a>
              )}
              {nft.explorers.map((explorer, index) => (
                <a key={index} href={explorer.link} target="_blank" rel="noopener noreferrer"
                   className="text-emerald-500 hover:text-emerald-600">
                  {explorer.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NftSinglePage;
