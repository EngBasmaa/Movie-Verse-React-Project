import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export function MyFilters({ onFilterChange }) {
  const [genre, setGenre] = useState("");
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(
    () => {
      onFilterChange({ genre, category, searchQuery, sortBy });
    },
    [onFilterChange, genre, category, searchQuery, sortBy]
  );

  return (
    <div className="bg-zinc-800 text-white shadow-md rounded-lg p-6 mb-6 w-full max-w-6xl mx-auto">
      <div className="flex flex-wrap gap-6 justify-center">
        {/* Genre Filter */}
        <select
          value={genre}
          onChange={e => setGenre(e.target.value)}
          className="p-2 border  border-pink-700 text-zinc-200 letter-spacing-2 rounded-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" className="text-pink-700 font-semibold">
            🎬 Genre
          </option>
          <option value="Action" className="text-pink-700 font-semibold">
            Action
          </option>
          <option value="Comedy" className="text-pink-700 font-semibold">
            Comedy
          </option>
          <option value="Drama" className="text-pink-700 font-semibold">
            Drama
          </option>
          <option value="Thriller" className="text-pink-700 font-semibold">
            Thriller
          </option>
        </select>

        {/* Category Filter */}
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="p-2 border border-pink-700 text-zinc-200  rounded-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" className="text-pink-700 font-semibold">
            👥 Audience
          </option>
          <option value="general" className="text-pink-700 font-semibold">
            General
          </option>
          <option value="adults" className="text-pink-700 font-semibold">
            Adults
          </option>
        </select>

        {/* Sort Filter */}
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="p-3 border  border-pink-700 text-zinc-200 rounded-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" className="text-pink-700 font-semibold">
            🔽 Sort By
          </option>
          <option value="rating" className="text-pink-700 font-semibold">
            Rating
          </option>
          <option value="releaseDate" className="text-pink-700 font-semibold">
            Release Date
          </option>
        </select>

        {/* Search Filter */}
        <input
          type="text"
          placeholder="🔍 Search by title"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="p-2 border border-pink-700 text-white rounded-md text-sm font-semibold w-56 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  );
}
MyFilters.propTypes = {
  onFilterChange: PropTypes.func.isRequired
};
