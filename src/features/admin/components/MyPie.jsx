import React from "react";
import { Doughnut } from "react-chartjs-2"; // استبدال Pie بـ Doughnut
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// تسجيل العناصر اللازمة من Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

export function MyPie({ movies }) {
  if (!Array.isArray(movies) || movies.length === 0) {
    return <p className="text-center text-gray-600">No data available.</p>;
  }

  // حساب عدد الأفلام لكل نوع (genre)
  const genreCounts = movies.reduce((acc, movie) => {
    // تكرار جميع الأنواع لكل فيلم
    movie.genres.forEach(genre => {
      acc[genre] = (acc[genre] || 0) + 1;
    });
    return acc;
  }, {});

  // تحويل البيانات إلى تنسيق يناسب chart.js
  const genreLabels = Object.keys(genreCounts);
  const genreData = Object.values(genreCounts);

  const data = {
    labels: genreLabels,
    datasets: [
      {
        label: "Movie Genres Distribution",
        data: genreData,
        backgroundColor: [
          "#FF5733", // الكوميدي
          "#33FF57", // الأكشن
          "#f8961e", // الدراما
          "#212121", // الفانتازيا
          "#3498db", // الرعب
          "#9b59b6", // الخيال العلمي
          "#e74c3c", // المغامرة
          "#1abc9c", // الوثائقي
          "#f1c40f", // الجريمة
          "#16a085", // التاريخي
          "#2ecc71", // الرومانسي
          "#e67e22", // التشويق
          "#8e44ad", // الأنيمي
          "#2980b9" // الرياضة
        ], // مجموعة متنوعة من الألوان
        borderColor: "#212121",
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#212121" }
      },
      tooltip: {
        // تغيير موقع التلميح
        position: "nearest", // يجعل التلميح يظهر قريبًا من نقطة البيانات
        callbacks: {
          label: function(context) {
            const title = context.chart.data.labels[context.dataIndex];
            const value = context.formattedValue;
            return `${title}: ${value} films`; // عرض التفاصيل في التلميحات
          }
        }
      }
    },
    layout: {
      padding: {
        top: 10, // زيادة المسافة من الأعلى قليلاً
        left: 10, // زيادة المسافة من الجوانب
        right: 10,
        bottom: 10
      }
    }
  };

  return (
    <div className="p-4 max-w-xs mx-auto">
      <Doughnut data={data} options={options} />
      {/* هنا تم استبدال Pie بـ Doughnut */}
    </div>
  );
}
