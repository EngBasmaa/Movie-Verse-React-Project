import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByGenre,
  filterBySearch,
  paginate,
  sortByPopularity,
  sortByRating,
} from "../../../shared/utils/seriesUtils";
import { getAllSeriesAction } from "../seriesSlice";

export function Series() {
  const { series, isLoading, errors } = useSelector(
    (store) => store.seriesSlice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!series || series.length === 0) {
      dispatch(getAllSeriesAction());
    }
  }, [dispatch, series]);
  // Local Filters
  const [genre, setGenre] = useState("All");
  const [sortType, setSortType] = useState("rating");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const filteredSeries = useMemo(() => {
    let result = [...series];
    if (genre !== "All") {
      result = filterByGenre(result, genre);
    }

    if (searchQuery) {
      result = filterBySearch(result, searchQuery);
    }

    if (sortType === "rating") {
      result = sortByRating(result);
    } else if (sortType === "popularity") {
      result = sortByPopularity(result);
    }

    return result;
  }, [series, genre, searchQuery, sortType]);

  const paginatedSeries = useMemo(() => {
    return paginate(filteredSeries, currentPage, limit);
  }, [filteredSeries, currentPage]);

  if (isLoading) return <h1>Loading...</h1>;
  if (errors) return <h1>Error: {errors}</h1>;

  return (
    <>
      <div>
        {/* Filter + Sort Controls */}
        <select onChange={(e) => setGenre(e.target.value)}>
          <option value="All">All</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Science Fiction">Science Fiction</option>
        </select>

        <select onChange={(e) => setSortType(e.target.value)}>
          <option value="rating">Rating</option>
          <option value="popularity">Popularity</option>
        </select>

        <input
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Display Series */}
        {paginatedSeries.map((series) => (
          <div key={series.id}>
            <h3>{series.title}</h3>
            <p>{series.genres.join(", ")}</p>
          </div>
        ))}

        {/* Pagination Controls */}
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() =>
            setCurrentPage((p) =>
              p < Math.ceil(filteredSeries.length / limit) ? p + 1 : p
            )
          }
          disabled={currentPage === Math.ceil(filteredSeries.length / limit)}
        >
          Next
        </button>
      </div>
    </>
  );
}
