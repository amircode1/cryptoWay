import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

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