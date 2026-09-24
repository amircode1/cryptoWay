import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const getApiErrorMessage = (error, fallback) => error.response?.data?.message || fallback;

// Fetcher Function for market cap data
const fetchMarketCapData = async () => {
  try {
    const response = await axios.get(`${apiUrl}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: true,
        accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching market cap data:', error);
    throw error;
  }
};

// useMarketCapQuery hook
export const useMarketCapQuery = () => {
  return useQuery({
    queryKey: ['marketCapData'],
    queryFn: fetchMarketCapData,
    staleTime: 60000, // 1 minute
    gcTime: 300000, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

// Fetcher for global market data (total market cap, volume, dominance)
const fetchGlobalData = async () => {
  const response = await axios.get(`${apiUrl}/global`, {
    params: { accept: 'application/json' },
  });
  return response.data?.data;
};

// useGlobalDataQuery hook
export const useGlobalDataQuery = () => {
  return useQuery({
    queryKey: ['globalData'],
    queryFn: fetchGlobalData,
    staleTime: 60000,
    gcTime: 300000,
    retry: 2,
  });
};

// Fetcher Function for coins list based on page
const fetchCoinsList = async (page) => {
  const response = await axios.get(`${ apiUrl }/coins/markets`, {
    params: {
      vs_currency: 'usd',
      page: page,
      per_page: 100,
      sparkline: true,
      accept: 'application/json',
    },
  });
  return response.data;
};

// useCoinsListQuery hook
export const useCoinsListQuery = (page) => {
  return useQuery({
    queryKey: ['coinsList', page],
    queryFn: () => fetchCoinsList(page),
    enabled: !!page, // Enable only if page is truthy
    staleTime: 60000,
    gcTime: 300000,
    retry: 2,
    retryDelay: (attemptNumber) => Math.min(1000 * 2 ** attemptNumber, 30000), // Exponential backoff
  });
};

// Fetcher Function for trending coins
const fetchTrendingCoins = async () => {
  const response = await axios.get(`${ apiUrl }/search/trending`, {
    headers: {
      accept: 'application/json',
    },
  });
  return response.data;
};

// useTrendingCoinsQuery hook
export const useTrendingCoinsQuery = () => {
  return useQuery({
    queryKey: ['/search/trending'],
    queryFn: fetchTrendingCoins,
    staleTime: 60000, // 1 minute
    gcTime: 300000, // 5 minutes
    retry: 2,
  });
};

// Fetcher Function for categories data
const fetchCategoriesData = async () => {
  try {
    const response = await axios.get(`${apiUrl}/coins/categories`, {
      headers: {
        accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Error fetching categories'), { cause: error });
  }
};

// useCategoriesQuery hook
export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategoriesData,
    staleTime: 120000, // 2 minutes
    gcTime: 600000, // 10 minutes
    retry: 2,
    onError: (error) => {
      console.error('Failed to fetch categories:', error.message);
    },
  });
};

export const fetchExchanges = async (page) => {
  try {
    console.log('Fetching exchanges data for page:', page);
    const response = await axios.get(`${apiUrl}/exchanges`, {
      params: {
        page,
        per_page: 100,
        accept: 'application/json',
      },
      headers: {
        accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching exchanges:', error);
    throw new Error(getApiErrorMessage(error, 'Error fetching exchanges'), { cause: error });
  }
};

// useExchangesQuery Hook
export const useExchangesQuery = (page) => {
  return useQuery({
    queryKey: ['exchanges', page],
    queryFn: () => fetchExchanges(page),
    staleTime: 120000, // 2 minutes
    gcTime: 600000, // 10 minutes
    retry: 2,
    enabled: !!page,
    onError: (error) => {
      console.error('Failed to fetch exchanges:', error.message);
    },
  });
};

const fetchDerivatives = async (page) => {
  try {
    const response = await axios.get(`${apiUrl}/derivatives/exchanges`, {
      params: {
        order: 'open_interest_btc_desc',
        page: page,
        per_page: 100,
        accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Error fetching categories'), { cause: error });
  }
};

export const useDerivativesQuery = (page) => {
  return useQuery({
    queryKey: ['derivatives',page],
    queryFn : () => fetchDerivatives(page),
    staleTime: 120000, // 2 minutes
    gcTime: 600000, // 10 minutes
    retry: 2,
    onError: (error) => {
      console.error('Failed to fetch categories:', error.message);
    }
  });
};

const fetchNFTData = async (page) => {
  try {
    const response = await axios.get(`${apiUrl}/nfts/list`, {
      params: {
        order: 'market_cap_usd_desc',
        page: page,
        per_page: 100,
        accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Error fetching NFTs'), { cause: error });
  }
};

// query hook برای استفاده از داده‌ها
export const useNFTQuery = (page) => {
  return useQuery({
    queryKey: ['nfts', page],
    queryFn: () => fetchNFTData(page),
    staleTime: 120000, // 2 minutes
    gcTime: 600000, // 10 minutes
    retry: 2,
    onError: (error) => {
      console.error('Failed to fetch NFTs:', error.message);
    },
  });
};

 const fetchNftDetails = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/nfts/${id}`, {
      params: {
        accept: 'application/json',
      },
    });
    return response.data;
  } catch {
    throw new Error(`Error fetching details for NFT: ${id}`);
  }
};

export const useNftDetailsQuery = (id) => {
  return useQuery({
    queryKey: ['nftDetails', id],
    queryFn: () => fetchNftDetails(id),
    enabled: !!id, // فقط زمانی که id موجود باشد، درخواست زده شود
    staleTime: 120000,
    gcTime: 600000,
    retry: 2,
    onError: (error) => {
      console.error(`Failed to fetch details for NFT ${id}:`, error.message);
    },
  });
};

// Revised fetchCoins function
const fetchCoins = async (web_slug) => {
  try {
    console.log('Fetching coin data for:', web_slug);
    const response = await axios.get(`${apiUrl}/coins/${web_slug}`, {
      params: {
        localization: false,
        tickers: true,
        market_data: true,
        community_data: true,
        developer_data: true,
        sparkline: true,
      },
    });
    console.log('Response received:', response.data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occurred while fetching data.';
    console.error('Error in fetchCoins:', error);
    throw new Error(errorMessage, { cause: error });
  }
};

// Improved useCoinsQuery hook
export const useCoinsQuery = (web_slug) => {
  return useQuery({
    queryKey: ['coinsPage', web_slug],
    queryFn: () => fetchCoins(web_slug),
    staleTime: 120000,
    gcTime: 600000,
    retry: 2,
    enabled: !!web_slug,
    onError: (error) => {
      console.error('Failed to fetch coins:', error.message);
    },
  });
};

// Function to fetch chart data
const fetchChartData = async (coinId, chartType, timeRange) => {
  try {
    let endpoint = `${apiUrl}/coins/${coinId}`;
    let params = {};

    if (chartType === "price-volume") {
      endpoint += `/market_chart`;
      params = {
        vs_currency: "usd",
        days: timeRange,
      };
    } else if (chartType === "ohlc") {
      endpoint += `/ohlc`;
      params = {
        vs_currency: "usd",
        days: timeRange,
      };
    } else {
      throw new Error("Invalid chart type.");
    }

    const response = await axios.get(endpoint, { params });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An error occurred while fetching chart data.";
    console.error(errorMessage);
    throw new Error(errorMessage, { cause: error });
  }
};

// Query Hook برای داده‌های نمودار
export const useChartQuery = (coinId, chartType, timeRange) => {
  return useQuery({
    queryKey: ["chartData", coinId, chartType, timeRange],
    queryFn: () => fetchChartData(coinId, chartType, timeRange),
    staleTime: 120000, // 2 minutes
    gcTime: 600000, // 10 minutes
    retry: 2,
    onError: (error) => {
      console.error("Failed to fetch chart data:", error.message);
    },
    enabled: !!coinId,
  });
};