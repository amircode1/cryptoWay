import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToNftList, removeFromNftList } from '../features/nftSlice';
import PaginationControlled from './Pagination';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from 'react-router-dom';

const NftTable = ({ data, page, setPage, loading }) => {
  const nfts = useSelector((state) => state.nfts);
  const dispatch = useDispatch();

  if (!data || data.length === 0) {
    return <div className="text-center text-gray-700">No data available</div>;
  }

  const addToNftListHandler = (nft) => {
    if (!nfts.some((item) => item.id === nft.id)) {
      const formattedNft = {
        id: nft.id,
        name: nft.name,
        symbol: nft.symbol,
        thumb: nft.thumb || nft.image,
        floor_price: nft.floor_price,
        floor_price_24h_percentage_change: nft.floor_price_24h_percentage_change
      };
      dispatch(addToNftList(formattedNft));
    }
  };

  const removeFromNftListHandler = (nft) => {
    dispatch(removeFromNftList(nft));
  };

  const isInNftList = (nftId) => {
    return nfts.some((item) => item.id === nftId);
  };

  return (
    <div className="w-full max-w-7xl mx-auto overflow-x-auto">
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs sm:text-sm md:text-base text-left text-gray-700">
          <thead className="bg-emerald-500 text-gray-50 uppercase font-semibold">
            <tr>
              <th className="px-2 sm:px-4 py-2">#</th>
              <th className="px-2 sm:px-4 py-2">Name</th>
              <th className="px-2 sm:px-4 py-2">Symbol</th>
              <th className="px-2 sm:px-4 py-2">Contract Address</th>
              <th className="px-2 sm:px-4 py-2">Platform</th>
              <th className="px-2 sm:px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className='font-sans'>
            {loading ? (
              [...Array(10)].map((_, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="px-2 sm:px-4 py-3"><Skeleton /></td>
                  <td className="px-2 sm:px-4 py-3"><Skeleton /></td>
                  <td className="px-2 sm:px-4 py-3"><Skeleton /></td>
                  <td className="px-2 sm:px-4 py-3"><Skeleton /></td>
                  <td className="px-2 sm:px-4 py-3"><Skeleton /></td>
                  <td className="px-2 sm:px-4 py-3"><Skeleton width={120} height={30} /></td>
                </tr>
              ))
            ) : (
              data.map((nft, index) => (
                <tr
                  key={nft.id}
                  className="border-b border-gray-300 hover:bg-green-100 transition-colors duration-200"
                >
                  <td className="px-2 sm:px-4 py-3 text-center">
                    {(page - 1) * 100 + index + 1}
                  </td>
                  <td className="px-2 sm:px-4 py-3">
                    <div className="hover:text-emerald-600">
                      <Link 
                        to={`/nft-list/${nft.id}`}
                        className="font-medium hover:text-emerald-600"
                      >
                        {nft.name}
                      </Link>
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 py-3">{nft.symbol}</td>
                  <td
                    className="px-2 sm:px-4 py-3 max-w-[150px] sm:max-w-xs truncate text-emerald-600"
                    title={nft.contract_address}
                  >
                    {nft.contract_address}
                  </td>
                  <td className="px-2 sm:px-4 py-3">{nft.asset_platform_id || 'N/A'}</td>
                  <td className="px-2 sm:px-4 py-3 text-center">
                    <button
                      onClick={() =>
                        isInNftList(nft.id)
                          ? removeFromNftListHandler(nft)
                          : addToNftListHandler(nft)
                      }
                      className={`px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-full text-white ${
                        isInNftList(nft.id)
                          ? 'bg-red-500 hover:bg-red-600'
                          : 'bg-green-500 hover:bg-green-600'
                      } transition-colors duration-300`}
                    >
                      {isInNftList(nft.id) ? 'Remove from NFT List' : 'Add to NFT List'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <PaginationControlled page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default NftTable;
