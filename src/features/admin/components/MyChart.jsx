import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import PropTypes from "prop-types";

// تسجيل المكونات في Chart.js
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
  const renderChart = (dataArray, labelText) => {
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
      return (
        <p className="text-center text-gray-600 font-semibold">
          No chart data available for {labelText.toLowerCase()}
        </p>
      );
    }

    const labels = dataArray.map(item => item.title || "Untitled");
    const dataValues = dataArray.map(
      item =>
        typeof item.rating === "string"
          ? parseFloat(item.rating) || 0
          : item.rating || item.vote_average || 0
    );

    const data = {
      labels,
      datasets: [
        {
          label: `${labelText} Ratings`,
          data: dataValues,
          fill: false,
          backgroundColor: "#e91e63",
          borderColor: "#e91e63",
          tension: 0.3
        }
      ]
    };

    const options = {
      responsive: true,
      plugins: {
        legend: { position: "top", labels: { color: "#333" } },
        title: {
          display: true,
          text: `${labelText} Ratings Chart`,
          color: "#333",
          font: { size: 30 }
        }
      },
      scales: {
        x: {
          type: "category",
          ticks: { color: "#e91e63", font: { size: 13 } }
        },
        y: {
          beginAtZero: true,
          max: 10,
          ticks: { color: "#e91e63", font: { size: 14 } }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const title = context.chart.data.labels[context.dataIndex];
            const value = context.formattedValue;
            return `🎬 ${title}: ⭐ ${value}`;
          }
        }
      }
    };

    return <Line data={data} options={options} />;
  };

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-8 bg-red-100">
      {movies.length > 0 && renderChart(movies, "Movie")}
      {series.length > 0 && renderChart(series, "Series")}
    </div>
  );
}

MyChart.propTypes = {
  movies: PropTypes.array,
  series: PropTypes.array
};
