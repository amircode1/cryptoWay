import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const apiUrlCmp = import.meta.env.VITE_API_URL_CMP;
const apiKeyCmp = import.meta.env.VITE_API_KEY_CMP;

// بررسی وجود API Key برای CMP
if (!apiKeyCmp) {
  console.error('API Key (apiKeyCmp) is not defined. Please check your .env configuration.');
}

// ایجاد نمونه‌ی Axios برای CMP
export const axiosInstanceCmp = axios.create({
  baseURL: apiUrlCmp,
  headers: {
    'X-CMC_PRO_API_KEY': apiKeyCmp,
    'Content-Type': 'application/json',
  },
  timeout: 10000, // زمان‌بندی 10 ثانیه برای درخواست‌ها
});

// ایجاد نمونه‌ی Axios پیش‌فرض
const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'x-cg-pro-api-key': apiKey,
    'Accept': 'application/json',
  },
  timeout: 10000, // زمان‌بندی 10 ثانیه برای درخواست‌ها
});

// افزودن API Key به درخواست‌ها
axiosInstance.interceptors.request.use(
  (config) => {
    if (apiKey) {
      config.headers['x_cg_pro_api_key'] = apiKey; // اضافه کردن API Key به هدر
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default axiosInstance;