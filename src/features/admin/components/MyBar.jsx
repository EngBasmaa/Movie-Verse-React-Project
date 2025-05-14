import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PropTypes from "prop-types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function MyBar({ movies = [], series = [] }) {
  const movieCount = movies.length;
  const seriesCount = series.length;

  const data = {
    labels: ["Movies", "TV Series"],
    datasets: [
      {
        label: "Total Count",
        data: [movieCount, seriesCount],
        backgroundColor: [
          "linear-gradient(90deg, #ec4899, #8b5cf6)",
          "linear-gradient(90deg, #2dd4bf, #0ea5e9)",
        ],
        borderColor: ["#4883af", "#4883af"],
        borderWidth: 2,
        borderRadius: 12,
        borderSkipped: false,
        barPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#6b7280",
          font: {
            size: 14,
            family: "Inter",
          },
          padding: 20,
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: "Content Statistics",
        color: "#1f2937",
        font: {
          size: 20,
          weight: "600",
          family: "Inter",
        },
        padding: { bottom: 20 },
      },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#f3f4f6",
        bodyColor: "#e5e7eb",
        borderColor: "#374151",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        bodyFont: {
          size: 14,
          weight: "500",
        },
        callbacks: {
          label: (context) =>
            `${context.label}: ${context.formattedValue} Items`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#4b5563",
          font: {
            size: 14,
            weight: "500",
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#e5e7eb",
          drawBorder: false,
        },
        ticks: {
          color: "#4b5563",
          stepSize: 1,
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 max-w-2xl mx-auto">
      <div className="h-96">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

MyBar.propTypes = {
  movies: PropTypes.array,
  series: PropTypes.array,
};
