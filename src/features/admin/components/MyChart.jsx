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

// تسجيل المقاييس
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function MyChart({ movies }) {
  if (!Array.isArray(movies) || movies.length === 0) {
    return (
      <p className="text-center text-gray-600">No chart data available.</p>
    );
  }

  const labels = movies.map(movie => movie.title);

  // تأكد من التعامل مع التقييم بشكل صحيح
  const dataValues = movies.map(
    movie =>
      typeof movie.rating === "string"
        ? parseFloat(movie.vote_average) || 0
        : movie.vote_average || 0
  ); // لو كانت التقييمات نصية حولها لعدد أو صفر // لو كانت التقييمات غير موجودة ضع صفر

  const data = {
    labels,
    datasets: [
      {
        label: "Movie Ratings",
        data: dataValues,
        fill: false,
        backgroundColor: "#f8961e",
        borderColor: "#f8961e",
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
        text: "Ratings Chart",
        color: "#212121",
        font: { size: 18 }
      }
    },
    scales: {
      x: { type: "category", ticks: { color: "#333" } }, // استخدام 'category' هنا
      y: { beginAtZero: true, max: 10, ticks: { color: "#333" } }
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

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Line data={data} options={options} />
    </div>
  );
}
