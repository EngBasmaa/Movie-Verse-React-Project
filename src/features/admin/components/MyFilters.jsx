import { useState } from "react";

export function MyFilters({ onFilterChange }) {
  const [genre, setGenre] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterChange = () => {
    onFilterChange({
      genre,
      category,
      language,
      searchQuery
    });
  };

  return (
    <div className="flex space-x-4 mb-4">
      {/* Genre Filter */}
      <select
        value={genre}
        onChange={e => setGenre(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option value="">Select Genre</option>
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Thriller">Thriller</option>
      </select>

      {/* Category Filter */}
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option value="">Select Category</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
      </select>

      {/* Language Filter */}
      <select
        value={language}
        onChange={e => setLanguage(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option value="">Select Language</option>
        <option value="en">English</option>
        <option value="ar">Arabic</option>
        <option value="fr">French</option>
      </select>

      {/* Search Filter */}
      <input
        type="text"
        placeholder="Search by title"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      />

      {/* Apply Filters */}
      <button
        onClick={handleFilterChange}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Apply Filters
      </button>
    </div>
  );
}
