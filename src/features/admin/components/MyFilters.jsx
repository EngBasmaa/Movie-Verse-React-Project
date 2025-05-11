import { useState, useEffect } from "react";

export function MyFilters({ onFilterChange }) {
  const [genre, setGenre] = useState("");
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(
    () => {
      onFilterChange({ genre, category, searchQuery, sortBy });
    },
    [genre, category, searchQuery, sortBy]
  );

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-6">
      {/* Genre Filter */}
      <select
        value={genre}
        onChange={e => setGenre(e.target.value)}
        className="p-2 border border-gray-300 rounded-md text-sm"
      >
        <option value="">🎬 Genre</option>
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Thriller">Thriller</option>
      </select>

      {/* Category Filter */}
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="p-2 border border-gray-300 rounded-md text-sm"
      >
        <option value="">👥 Audience</option>
        <option value="general">General</option>
        <option value="adults">Adults</option>
      </select>

      {/* Sort Filter */}
      <select
        value={sortBy}
        onChange={e => setSortBy(e.target.value)}
        className="p-2 border border-gray-300 rounded-md text-sm"
      >
        <option value="">🔽 Sort By</option>
        <option value="rating">Rating</option>
        <option value="releaseDate">Release Date</option>
      </select>

      {/* Search Filter */}
      <input
        type="text"
        placeholder="🔍 Search by title"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="p-2 border border-gray-300 rounded-md text-sm w-48"
      />
    </div>
  );
}
