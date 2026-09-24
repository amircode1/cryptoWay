import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { CandlestickSeries, CrosshairMode, createChart } from "lightweight-charts";
import { useChartQuery } from "../queries/useQuery";
import Skeleton from "react-loading-skeleton"; // اضافه کردن Skeleton
import "react-loading-skeleton/dist/skeleton.css";

const Chart2 = ({ coinId, timeFrame }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);

  // Fetch data for the selected timeframe
  const { data, isLoading, isError, error } = useChartQuery(coinId, "ohlc", timeFrame);

  useEffect(() => {
    if (chartContainerRef.current) {
      chartRef.current = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 400,
        layout: {
          background: { color: "#ffffff" },
          textColor: "#333",
        },
        grid: {
          vertLines: {
            color: "#eee",
          },
          horzLines: {
            color: "#eee",
          },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
        },
        priceScale: {
          borderColor: "#ccc",
        },
        timeScale: {
          borderColor: "#ccc",
          timeVisible: true,
          secondsVisible: false,
        },
      });

      candleSeriesRef.current = chartRef.current.addSeries(CandlestickSeries, {
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderDownColor: "#ef5350",
        borderUpColor: "#26a69a",
        wickDownColor: "#ef5350",
        wickUpColor: "#26a69a",
      });

      const resizeObserver = new ResizeObserver((entries) => {
        if (entries.length > 0) {
          const { width, height } = entries[0].contentRect;
          chartRef.current.resize(width, height);
        }
      });

      resizeObserver.observe(chartContainerRef.current);

      return () => {
        resizeObserver.disconnect();
        if (chartRef.current) {
          chartRef.current.remove();
        }
      };
    }
  }, []);

  useEffect(() => {
    if (candleSeriesRef.current && data) {
      const formattedData = data.map(([timestamp, open, high, low, close]) => ({
        time: timestamp / 1000,
        open,
        high,
        low,
        close,
      }));
      candleSeriesRef.current.setData(formattedData);
    }
  }, [data]);

  // حالت Loading
  if (isLoading) {
    return (
      <div className="w-full h-[400px]">
        <Skeleton height={400} />
      </div>
    );
  }

  // حالت خطا
  if (isError) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div
      ref={chartContainerRef}
      className="w-full h-[400px]"
      aria-label="OHLC Chart"
      role="img"
    />
  );
};

Chart2.propTypes = {
  coinId: PropTypes.string.isRequired,
  timeFrame: PropTypes.string.isRequired,
};

export default Chart2;