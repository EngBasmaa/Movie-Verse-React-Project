import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Sidebar } from "../../../components/moviesCompnents/sidebar.component.jsx";
import { MovieGrid } from "../../../components/moviesCompnents/movieGrid.component.jsx";
import {
  filterSeriesByGenre,
  sortSeriesByPopularity,
  sortSeriesByRating,
  sortSeriesByReleaseDate,
} from "../../../shared/utils/seriesUtils.js";

export function Series() {
  const { series, isLoading } = useSelector((store) => store.seriesSlice);
  const { movies } = useSelector((store) => store.movieSlice);

  const [selectedGenre, setSelectedGenre] = useState("Everything");
  const [sortOrder, setSortOrder] = useState("popularity");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredAndSortedSeries = useMemo(() => {
    const dataSource = selectedGenre === "Movie" ? movies : series;
    const cleanedData = dataSource.map((item) => ({
      ...item,
      genres: Array.isArray(item.genres)
        ? item.genres
        : typeof item.genres === "string"
        ? [item.genres]
        : ["Unknown"],
    }));

    // Filter data by selected genre
    const filtered =
      selectedGenre === "Everything"
        ? cleanedData
        : filterSeriesByGenre(cleanedData, selectedGenre);

    // Sort data by selected option
    switch (sortOrder) {
      case "popularity":
        return sortSeriesByPopularity(filtered);
      case "rating":
        return sortSeriesByRating(filtered);
      case "releaseDateAsc":
        return sortSeriesByReleaseDate(filtered, "asc");
      case "releaseDateDesc":
        return sortSeriesByReleaseDate(filtered, "desc");
      default:
        return filtered;
    }
  }, [series, movies, selectedGenre, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedSeries.length / itemsPerPage);

  const currentSeries = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedSeries.slice(start, start + itemsPerPage);
  }, [filteredAndSortedSeries, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen p-4 bg-zinc-900">
      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        <Sidebar
          selectedGenre={selectedGenre}
          setSelectedGenre={(genre) => {
            setSelectedGenre(genre);
            setCurrentPage(1);
          }}
          sortOrder={sortOrder}
          setSortOrder={(order) => {
            setSortOrder(order);
            setCurrentPage(1);
          }}
        />
        {isLoading ? (
          "loading..."
        ) : (
          <MovieGrid
            movies={currentSeries}
            isSeries={selectedGenre !== "Movie"}
          />
        )}
      </div>

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-red-600 text-white" : "bg-white"
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
