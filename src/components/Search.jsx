import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaSearch } from 'react-icons/fa';
import SearchResults from './SearchResults';

const apiUrl = import.meta.env.VITE_API_URL;

const fetchSearchResults = async (term) => {
  const response = await fetch(`${apiUrl}/search?query=${term}`);
  if (!response.ok) {
    throw new Error('Error fetching search results');
  }
  return response.json();
};

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  const { data: searchResults, isLoading, isError, error } = useQuery({
    queryKey: ['searchResults', searchTerm],
    queryFn: () => fetchSearchResults(searchTerm),
    enabled: !!searchTerm,
    staleTime: 60000,
    gcTime: 300000,
  });

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    setShowResults(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef} className="relative">
      <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500 pointer-events-none" size={14} />
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-emerald-300 bg-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
      />
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-xl rounded-xl z-50">
          {isLoading ? (
            <p className="p-4 text-gray-500 text-sm">Loading...</p>
          ) : isError ? (
            <p className="p-4 text-red-500 text-sm">Error: {error.message}</p>
          ) : (
            <SearchResults results={searchResults} />
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
