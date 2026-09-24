import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function SearchResults({ results }) {
    return (
        <div className="mt-4 max-h-96 overflow-y-auto p-2">
            {results && results.coins && results.coins.map ? (
                results.coins.map((coin) => (
                    <div key={coin.id} className="transition duration-300 ease-in-out transform hover:scale-105 hover:bg-green-100 flex items-center space-x-4 p-4 bg-green-50 rounded-lg mb-2 border-2 hover:border-emerald-300">
                        <img src={coin.thumb} alt={coin.name} className="w-10 h-10 rounded-full" />
                        <div>
                            <Link to={`/${coin.id}`} className="text-gray-900 font-semibold hover:text-green-600">{coin.name}</Link>
                            <p className="text-gray-700">{coin.symbol}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-700">No results found</p>
            )}
        </div>
    );
}

SearchResults.propTypes = {
  results: PropTypes.object,
};

export default SearchResults;