import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import ChangeBadge from './ui/ChangeBadge';
import { formatUsd } from '../utils/format';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

// Presentational card — data comes from the parent.
const MarketCapCard = ({ data = [], label = 'Market Cap', color = 'rgba(16, 185, 129, 1)' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl border-2 border-emerald-300 shadow-card p-4 w-full h-full flex items-center justify-center text-gray-500">
        No data available
      </div>
    );
  }

  const prices = data.map((item) => item.current_price).filter((p) => typeof p === 'number');
  const first = prices[0];
  const last = prices[prices.length - 1];
  const change = first && last ? ((last - first) / first) * 100 : 0;

  const chartData = {
    labels: data.map(() => ''),
    datasets: [
      {
        label,
        data: prices,
        borderColor: color,
        backgroundColor: color.replace('1)', '0.2)'),
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

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

  return (
    <div className="bg-white rounded-xl border-2 border-emerald-300 shadow-card p-4 w-full h-full flex flex-col transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5">
      <h2 className="text-sm font-semibold text-gray-500 mb-1">{label}</h2>
      <div className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
        {formatUsd(last)}
      </div>
      <div className="mt-1">
        <ChangeBadge value={change} />
      </div>
      <div className="h-20 mt-auto">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

MarketCapCard.propTypes = {
  data: PropTypes.array,
  label: PropTypes.string,
  color: PropTypes.string,
};

export default MarketCapCard;
