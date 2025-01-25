import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { useQuery } from '@tanstack/react-query'; // اضافه کردن useQuery از React Query

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const MarketCapCard = ({ label = 'Market Cap', color = 'rgba(16, 185, 129, 1)' }) => {
  // استفاده از useQuery برای فراخوانی داده‌ها
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['marketCapData'],
    queryFn: fetchMarketCapData,
  });

  // تابع برای فراخوانی داده‌ها (شما باید این تابع را با توجه به API خود تنظیم کنید)
  async function fetchMarketCapData() {
    const response = await fetch('/api/marketCap'); // URL جایگزین کنید با API خود
    if (!response.ok) {
      throw new Error('Data fetch failed');
    }
    return response.json();
  }

  // داده‌های نمودار
  const chartData = {
    labels: data ? data.map(() => '') : [], // برچسب‌های خالی برای نمایش تمیز
    datasets: [
      {
        label,
        data: data ? data.map((item) => item.current_price) : [], // مقدار قیمت جاری
        borderColor: color,
        backgroundColor: color.replace('1)', '0.2)'), // تغییر شفافیت برای رنگ پس‌زمینه
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  // گزینه‌ها برای نمودار
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  // نمایش وضعیت‌های مختلف
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data: {error.message}</p>;
  if (!data || !data.length) return <p>No data available</p>;

  return (
    <div className="bg-slate-50 text-gray-900 rounded-lg p-4 w-full max-w-xs shadow-lg">
      <h2 className="text-2xl font-semibold mb-2">
        ${data[data.length - 1]?.current_price || 'N/A'}
      </h2>
      <p className="text-sm text-green-500">{label} ▲ 6.0%</p>
      <div className="h-20 mb-3">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default MarketCapCard;