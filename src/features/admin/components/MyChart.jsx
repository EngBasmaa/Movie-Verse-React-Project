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
} from "chart.js";
import PropTypes from "prop-types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function MyChart({ movies = [], series = [] }) {
  const chartTheme = {
    movie: {
      gradient: ["#ec4899", "#8b5cf6"],
      pointBorder: "#fff",
    },
    series: {
      gradient: ["#2dd4bf", "#0ea5e9"],
      pointBorder: "#fff",
    },
    text: "#374151",
    grid: "#e5e7eb",
    background: "#ffffff",
  };

  const renderChart = (dataArray, labelText, type) => {
    if (!Array.isArray(dataArray)) return null;

    const cleanData = dataArray
      .filter((item) => item?.rating || item?.vote_average)
      .map((item) => ({
        title: item.title || "Untitled",
        rating: parseFloat(item.rating || item.vote_average || 0),
      }));

    if (cleanData.length === 0) {
      return (
        <div className="p-4 text-center bg-gray-50 rounded-lg">
          <p className="text-gray-500 font-medium">
            No rating data available for {labelText.toLowerCase()}
          </p>
        </div>
      );
    }

    const data = {
      labels: cleanData.map((item) => item.title),
      datasets: [
        {
          label: `${labelText} Ratings`,
          data: cleanData.map((item) => item.rating),
          borderColor: `linear-gradient(90deg, ${chartTheme[type].gradient.join(
            ", "
          )})`,
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, chartTheme[type].gradient[0]);
            gradient.addColorStop(1, chartTheme[type].gradient[1]);
            return gradient;
          },
          borderWidth: 3,
          tension: 0.2,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointBackgroundColor: chartTheme[type].gradient[0],
          pointBorderColor: chartTheme[type].pointBorder,
          fill: true,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: `${labelText} Ratings Overview`,
          color: chartTheme.text,
          font: {
            size: 20,
            family: "Inter",
            weight: "600",
          },
          padding: { bottom: 15 },
        },
        tooltip: {
          backgroundColor: chartTheme.background,
          titleColor: chartTheme.text,
          bodyColor: chartTheme.text,
          borderColor: chartTheme.grid,
          borderWidth: 1,
          bodyFont: {
            size: 14,
            weight: "500",
          },
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || "";
              const value = context.parsed.y || 0;
              return `⭐ ${value.toFixed(1)} Rating`;
            },
            title: (context) => context[0].label,
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
            color: chartTheme.grid,
          },
          ticks: {
            color: chartTheme.text,
            font: {
              size: 13,
              weight: "500",
            },
            maxRotation: 45,
            minRotation: 45,
          },
        },
        y: {
          beginAtZero: true,
          max: 10,
          grid: {
            color: chartTheme.grid,
            drawBorder: false,
          },
          ticks: {
            color: chartTheme.text,
            stepSize: 1,
            font: {
              size: 14,
            },
          },
        },
      },
    };

    return (
      <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="h-96">
          <Line data={data} options={options} />
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-8">
      {renderChart(movies, "Movies", "movie")}
      {renderChart(series, "TV Series", "series")}
    </div>
  );
}

MyChart.propTypes = {
  movies: PropTypes.array,
  series: PropTypes.array,
};
