import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { addToNftList, removeFromNftList } from '../features/nftSlice';
import PaginationControlled from './Pagination';
import DataTable from './ui/DataTable';
import { Link } from 'react-router-dom';

const columns = [
  { key: 'rank', label: '#' },
  { key: 'name', label: 'Name' },
  { key: 'symbol', label: 'Symbol' },
  { key: 'contract', label: 'Contract Address' },
  { key: 'platform', label: 'Platform' },
  { key: 'actions', label: 'Actions', className: 'text-center' },
];

const NftTable = ({ data, page, setPage, loading }) => {
  const nfts = useSelector((state) => state.nfts);
  const dispatch = useDispatch();

  const addToNftListHandler = (nft) => {
    if (!nfts.some((item) => item.id === nft.id)) {
      const formattedNft = {
        id: nft.id,
        name: nft.name,
        symbol: nft.symbol,
        thumb: nft.thumb || nft.image,
        floor_price: nft.floor_price,
        floor_price_24h_percentage_change: nft.floor_price_24h_percentage_change,
      };
      dispatch(addToNftList(formattedNft));
    }
  };

  const removeFromNftListHandler = (nft) => {
    dispatch(removeFromNftList(nft));
  };

  const isInNftList = (nftId) => nfts.some((item) => item.id === nftId);

  if (!loading && (!data || data.length === 0)) {
    return <div className="text-center text-gray-500 py-8">No data available</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <DataTable columns={columns} loading={loading} scrollable>
        {data?.map((nft, index) => (
          <tr
            key={nft.id}
            className="border-b border-gray-200 hover:bg-emerald-50 transition-colors duration-200"
          >
            <td className="px-2 sm:px-4 py-3 text-center font-semibold text-gray-900">
              {(page - 1) * 100 + index + 1}
            </td>
            <td className="px-2 sm:px-4 py-3">
              <Link to={`/nft-list/${nft.id}`} className="font-medium text-gray-900 hover:text-emerald-600">
                {nft.name}
              </Link>
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
                  isInNftList(nft.id) ? removeFromNftListHandler(nft) : addToNftListHandler(nft)
                }
                className={`px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-full text-white ${
                  isInNftList(nft.id)
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-emerald-500 hover:bg-emerald-600'
                } transition-colors duration-300`}
              >
                {isInNftList(nft.id) ? 'Remove' : 'Add to List'}
              </button>
            </td>
          </tr>
        ))}
      </DataTable>

      <PaginationControlled page={page} setPage={setPage} />
    </div>
  );
};

NftTable.propTypes = {
  data: PropTypes.array,
  page: PropTypes.number,
  setPage: PropTypes.func,
  loading: PropTypes.bool,
};

export default NftTable;
