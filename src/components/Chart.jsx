import PropTypes from "prop-types";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
} from "chart.js";
import "chartjs-adapter-date-fns";
import zoomPlugin from "chartjs-plugin-zoom";
import { useChartQuery } from "../queries/useQuery";
import Chart2 from "./Chart2"; // وارد کردن Chart2
import Skeleton from "react-loading-skeleton"; // اضافه کردن Skeleton
import "react-loading-skeleton/dist/skeleton.css";

// ثبت پلاگین‌ها و عناصر
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler,
  zoomPlugin
);

const Chart = ({ coinId }) => {
  const [activeTab, setActiveTab] = useState("price-volume"); // مدیریت تب‌ها
  const [timeFrame, setTimeFrame] = useState("7"); // مدیریت بازه زمانی

  // Fetch data for the selected chart type and timeframe
  const { data, isLoading, isError, error } = useChartQuery(coinId, activeTab, timeFrame);

  // حالت Loading
  if (isLoading) {
    return (
      <div className="w-full p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <div className="space-y-2 sm:space-y-0 sm:space-x-4">
            <Skeleton width={150} height={40} />
            <Skeleton width={150} height={40} />
          </div>
          <Skeleton width={100} height={40} />
        </div>
        <Skeleton height={300} />
      </div>
    );
  }

  // حالت خطا
  if (isError) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  // داده‌های نمودار قیمت-حجم
  const priceVolumeLabels = data?.prices?.map(([timestamp]) =>
    new Date(timestamp).toLocaleTimeString()
  );
  const prices = data?.prices?.map(([, price]) => price);

  const priceVolumeChartData = {
    labels: priceVolumeLabels || [],
    datasets: [
      {
        label: "Price (USD)",
        data: prices || [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const priceVolumeChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.raw.toLocaleString()}`,
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          mode: "x",
        },
      },
    },
    scales: {
      x: { title: { display: true, text: "Time" } },
      y: { title: { display: true, text: "Price (USD)" }, beginAtZero: false },
    },
  };

  return (
    <div className="w-full p-4">
      {/* بخش انتخاب تب و بازه زمانی */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        {/* تغییر نوع نمودار */}
        <div className="space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            className={`px-4 py-2 rounded-lg text-white text-sm sm:text-base ${
              activeTab === "price-volume" ? "bg-emerald-500" : "bg-gray-500"
            }`}
            onClick={() => setActiveTab("price-volume")}
          >
            Price-Volume Chart
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-white text-sm sm:text-base ${
              activeTab === "ohlc" ? "bg-emerald-500" : "bg-gray-500"
            }`}
            onClick={() => setActiveTab("ohlc")}
          >
            OHLC Chart
          </button>
        </div>

        {/* انتخاب بازه زمانی */}
        <select
          className="px-4 py-2 border rounded-lg text-sm sm:text-base mt-2 sm:mt-0"
          value={timeFrame}
          onChange={(e) => setTimeFrame(e.target.value)}
        >
          <option value="1">1 Day</option>
          <option value="7">7 Days</option>
          <option value="30">30 Days</option>
        </select>
      </div>

      {/* نمایش نمودار بر اساس تب انتخاب‌شده */}
      {activeTab === "price-volume" && (
        <Line data={priceVolumeChartData} options={priceVolumeChartOptions} />
      )}
      {activeTab === "ohlc" && (
        <Chart2 coinId={coinId} timeFrame={timeFrame} /> // انتقال timeFrame به Chart2
      )}
    </div>
  );
};

Chart.propTypes = {
  coinId: PropTypes.string.isRequired,
};

export default Chart;