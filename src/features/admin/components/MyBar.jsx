import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import PropTypes from "prop-types";

// تسجيل المكونات في Chart.js
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

  // تحديد الحد الأقصى للمحور Y
  const maxCount = Math.max(movieCount, seriesCount);

  const data = {
    labels: ["Movies", "Series"],
    datasets: [
      {
        label: "Total Count",
        data: [movieCount, seriesCount],
        backgroundColor: ["#e91e63", "#212121"],
        borderColor: ["#e91e63", "#000000"],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Number of Movies vs Series",
        color: "#212121",
        font: { size: 30 }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.formattedValue}`;
          }
        }
      }
    },
    scales: {
      x: { ticks: { color: "#e91e63", font: { size: 16 } } },
      y: {
        beginAtZero: true,
        max: maxCount, // ضبط الحد الأقصى للمحور Y
        ticks: { stepSize: 1, color: "#e91e63", font: { size: 14 } }
      }
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <Bar data={data} options={options} />
    </div>
  );
}

MyBar.propTypes = {
  movies: PropTypes.array,
  series: PropTypes.array
};
