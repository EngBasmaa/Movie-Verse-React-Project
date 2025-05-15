import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Sidebar } from "../../../components/moviesCompnents/sidebar.component.jsx";
import { MovieGrid } from "../../../components/moviesCompnents/movieGrid.component.jsx";
import {
  filterByGenre,
  sortByPopularity,
  sortByRating,
  sortByReleaseDate,
} from "../../../shared/utils/movieUtils.js";

export function Movies() {
  const { movies, isLoading } = useSelector((store) => store.movieSlice);
  const { series } = useSelector((store) => store.seriesSlice);

  const [selectedGenre, setSelectedGenre] = useState("Everything");
  const [sortOrder, setSortOrder] = useState("popularity");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredAndSortedMovies = useMemo(() => {
    // تحديد مصدر البيانات بناءً على النوع المختار
    const dataSource = selectedGenre === "TV Movie" ? series : movies;
    const cleanedData = dataSource.map((item) => ({
      ...item,
      genres: Array.isArray(item.genres)
        ? item.genres
        : typeof item.genres === "string"
        ? [item.genres]
        : ["Unknown"],
    }));

    // تصفية البيانات حسب النوع المختار
    const filtered =
      selectedGenre === "Everything" || selectedGenre === "TV Movie"
        ? cleanedData
        : filterByGenre(cleanedData, selectedGenre);

    // ترتيب البيانات حسب الخيار المحدد
    switch (sortOrder) {
      case "popularity":
        return sortByPopularity(filtered);
      case "rating":
        return sortByRating(filtered);
      case "releaseDateAsc":
        return sortByReleaseDate(filtered, "asc");
      case "releaseDateDesc":
        return sortByReleaseDate(filtered, "desc");
      default:
        return filtered;
    }
  }, [movies, series, selectedGenre, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedMovies.length / itemsPerPage);

  const currentMovies = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedMovies.slice(start, start + itemsPerPage);
  }, [filteredAndSortedMovies, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 bg-zinc-900">
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
            movies={currentMovies}
            isSeries={selectedGenre === "TV Movie"}
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
                currentPage === i + 1 ? "bg-sky-600 text-white" : "bg-white"
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
