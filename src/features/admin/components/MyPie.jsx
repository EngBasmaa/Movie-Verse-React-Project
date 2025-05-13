import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import PropTypes from "prop-types";

ChartJS.register(ArcElement, Tooltip, Legend);

export function MyPie({ movies = [], series = [] }) {
  const renderGenreChart = (dataArray, labelText) => {
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
      return (
        <p className="text-center text-gray-400">
          No data available for {labelText.toLowerCase()}
        </p>
      );
    }

    const genreCounts = dataArray.reduce((acc, item) => {
      if (Array.isArray(item.genres)) {
        item.genres.forEach(genre => {
          acc[genre] = (acc[genre] || 0) + 1;
        });
      }
      return acc;
    }, {});

    const genreLabels = Object.keys(genreCounts);
    const genreData = Object.values(genreCounts);

    const chartData = {
      labels: genreLabels,
      datasets: [
        {
          label: `${labelText} Genres Distribution`,
          data: genreData,
          backgroundColor: [
            "#f8961e",
            "#e91e63",
            "#9ca3af",
            "#212121",
            "#3b82f6",
            "#22c55e"
          ],
          borderColor: "#212121",
          borderWidth: 1
        }
      ]
    };

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
          labels: { color: "#e91e63", font: { size: 16 } }
        },
        tooltip: {
          callbacks: {
            label: context => {
              const title = context.chart.data.labels[context.dataIndex];
              const value = context.formattedValue;
              return `${title}: ${value} ${labelText.toLowerCase()}`;
            }
          }
        }
      },
      layout: { padding: 10 }
    };

    return (
      <div className="flex items-center gap-6 bg-white rounded-lg shadow-md p-4 max-w-3xl mx-auto">
        <h3 className="text-3xl font-semibold text-pink-600 w-1/3 text-center">
          {labelText} Genres
        </h3>
        <div className="w-2/3">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {movies.length > 0 && renderGenreChart(movies, "Movies")}
      {series.length > 0 && renderGenreChart(series, "Series")}
    </div>
  );
}

MyPie.propTypes = {
  movies: PropTypes.array,
  series: PropTypes.array
};
