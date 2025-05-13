import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  filterSeriesByGenre,
  filterBySearch,
  paginate,
  sortSeriesByPopularity,
  sortSeriesByRating
} from "../../../shared/utils/seriesUtils";
import { Button } from "../../../shared/components/MyButton";

export function Series() {
  const { series, isLoading, errors } = useSelector(store => store.seriesSlice);

  // Local Filters
  const [genre, setGenre] = useState("All");
  const [sortType, setSortType] = useState("rating");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const filteredSeries = useMemo(
    () => {
      let result = [...series];
      if (genre !== "All") {
        result = filterSeriesByGenre(result, genre);
      }

      if (searchQuery) {
        result = filterBySearch(result, searchQuery);
      }

      if (sortType === "rating") {
        result = sortSeriesByRating(result);
      } else if (sortType === "popularity") {
        result = sortSeriesByPopularity(result);
      }

      return result;
    },
    [series, genre, searchQuery, sortType]
  );

  const paginatedSeries = useMemo(
    () => {
      return paginate(filteredSeries, currentPage, limit);
    },
    [filteredSeries, currentPage]
  );

  if (isLoading) return <h1>Loading...</h1>;
  if (errors)
    return (
      <h1>
        Error: {errors}
      </h1>
    );

  return (
    <div>
      {/* Filter + Sort Controls */}
      <select onChange={e => setGenre(e.target.value)}>
        <option value="All">All</option>
        <option value="Action">Action</option>
        <option value="Drama">Drama</option>
        <option value="Science Fiction">Science Fiction</option>
      </select>

      <select onChange={e => setSortType(e.target.value)}>
        <option value="rating">Rating</option>
        <option value="popularity">Popularity</option>
      </select>

      <input
        placeholder="Search..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />

      {/* Display Series */}
      {paginatedSeries.map(series =>
        <div key={series.id}>
          <h3>
            {series.title}
          </h3>
          <p>
            {series.genres.join(", ")}
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      <Button
        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
      >
        Prev
      </Button>
      <span>
        Page {currentPage}
      </span>
      <Button
        onClick={() =>
          setCurrentPage(
            p => (p < Math.ceil(filteredSeries.length / limit) ? p + 1 : p)
          )}
        disabled={currentPage === Math.ceil(filteredSeries.length / limit)}
      >
        Next
      </Button>
    </div>
  );
}
