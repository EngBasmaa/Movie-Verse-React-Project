import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import PropTypes from "prop-types";

ChartJS.register(ArcElement, Tooltip, Legend);

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export function MyPie({ movies = [], series = [] }) {
  const { width: windowWidth } = useWindowSize();
  const [showLegend, setShowLegend] = useState(true);

  const generateColors = (count) => {
    const baseColors = [
      "#6366f1",
      "#3b82f6",
      "#10b981",
      "#f59e0b",
      "#ec4899",
      "#8b5cf6",
    ];
    return Array.from(
      { length: count },
      (_, i) => baseColors[i % baseColors.length]
    );
  };

  const renderGenreChart = (dataArray, labelText) => {
    if (!Array.isArray(dataArray)) return null;

    if (dataArray.length === 0) {
      return (
        <div className="p-4 ">
          <p className="text-center text-gray-300 text-sm md:text-base">
            📊 No genre data available
          </p>
        </div>
      );
    }

    const genreCounts = dataArray.reduce((acc, item) => {
      item.genres?.forEach((genre) => {
        acc[genre] = (acc[genre] || 0) + 1;
      });
      return acc;
    }, {});

    const genreLabels = Object.keys(genreCounts);
    const genreData = Object.values(genreCounts);
    const total = genreData.reduce((sum, val) => sum + val, 0);

    const chartData = {
      labels: genreLabels,
      datasets: [
        {
          label: `${labelText} Genres`,
          data: genreData,
          backgroundColor: generateColors(genreLabels.length),
          borderColor: "#1f2937",
          borderWidth: 2,
          hoverOffset: 15,
          borderRadius: 6,
          spacing: 3,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      cutout: windowWidth < 768 ? "40%" : "50%",
      plugins: {
        legend: {
          display: windowWidth < 480 ? false : showLegend,
          position: windowWidth < 768 ? "bottom" : "right",
          align: "center",
          labels: {
            color: "#f3f4f6",
            font: {
              size: windowWidth < 768 ? 10 : 12,
              family: "Inter",
            },
            padding: 8,
            boxWidth: 12,
            usePointStyle: true,
          },
        },
        tooltip: {
          backgroundColor: "rgba(31, 41, 55, 0.95)",
          bodyColor: "#f3f4f6",
          borderColor: "#374151",
          borderWidth: 1,
          cornerRadius: 6,
          padding: 8,
          bodyFont: {
            size: 12,
            weight: "500",
          },
          callbacks: {
            label: (context) => {
              const value = context.parsed;
              const percentage = ((value / total) * 100).toFixed(1);
              return ` ${context.label}: ${value} (${percentage}%)`;
            },
          },
        },
      },
      animation: {
        animateRotate: true,
        animateScale: true,
      },
    };

    return (
      <div className="p-4  w-full min-w-[280px]">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-base md:text-lg font-semibold text-gray-100 border-b border-gray-600">
            {labelText} Genres
          </h3>
          {windowWidth <= 480 && (
            <button
              className="text-xs md:text-sm text-blue-400 hover:text-blue-300"
              onClick={() => setShowLegend(!showLegend)}
            >
              {showLegend ? "Hide Legend" : "Show Legend"}
            </button>
          )}
        </div>
        <div className="w-full h-[280px] md:h-[320px]">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      </div>
    );
  };

  return (
    <div className="">
      {movies.length > 0 && renderGenreChart(movies, "Movies")}
      {series.length > 0 && renderGenreChart(series, "TV Series")}
    </div>
  );
}

MyPie.propTypes = {
  movies: PropTypes.array,
  series: PropTypes.array,
};
