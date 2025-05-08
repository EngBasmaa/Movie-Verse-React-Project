import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  filterByGenre,
  filterBySearch,
  sortByRating,
  sortByPopularity,
  paginate,
} from "../../../shared/utils/movieUtils";

export function Movies() {
  const { movies, isLoading, errors } = useSelector(
    (store) => store.movieSlice
  );
  // Local Filters
  const [genre, setGenre] = useState("All");
  const [sortType, setSortType] = useState("rating"); // "rating" or "popularity"
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const filteredMovies = useMemo(() => {
    let result = [...movies];

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
  }, [movies, genre, searchQuery, sortType]);

  const paginatedMovies = useMemo(() => {
    return paginate(filteredMovies, currentPage, limit);
  }, [filteredMovies, currentPage]);
  console.log(filteredMovies, paginatedMovies);

  if (isLoading) return <h1>Loading...</h1>;
  if (errors) return <h1>Error: {errors}</h1>;

  return (
    <>
      <div>
        {/* Filter + Sort Controls */}
        <select onChange={(e) => setGenre(e.target.value)}>
          <option value="All">All</option>
          <option value="Action">Action</option>
          <option value="Thriller">Thriller</option>
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

        {/* Display Movies */}
        {paginatedMovies.map((movie) => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.genres.join(", ")}</p>
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
              p < Math.ceil(filteredMovies.length / limit) ? p + 1 : p
            )
          }
          disabled={currentPage === Math.ceil(filteredMovies.length / limit)}
        >
          Next
        </button>
      </div>
    </>
  );
}
