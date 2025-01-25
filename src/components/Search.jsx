import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
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

  // Use the object form for useQuery
  const { data: searchResults, isLoading, isError, error } = useQuery({
    queryKey: ['searchResults', searchTerm],
    queryFn: () => fetchSearchResults(searchTerm),
    enabled: !!searchTerm, // Request is only sent when searchTerm has a value
    staleTime: 60000, // Data freshness time
    cacheTime: 300000, // Data storage time in cache
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
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full px-4 py-2 rounded-lg border-2 border-emerald-300 focus:outline-none focus:border-green-500"
      />
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 max-w-96 bg-white shadow-lg rounded-lg z-50">
          {/* Display search results */}
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Error: {error.message}</p>
          ) : (
            <SearchResults results={searchResults} />
          )}
        </div>
      )}
    </div>
  );
}

export default Search;