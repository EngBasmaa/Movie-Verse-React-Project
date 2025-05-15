import React from "react";

const genres = [
  "Everything",
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "TV Movie",
  "Thriller",
  "War",
  "Western",
];

// sidebar.component.jsx
export function Sidebar({
  selectedGenre,
  setSelectedGenre,
  sortOrder,
  setSortOrder,
}) {
  return (
    <aside className="md:col-span-1 space-y-6">
      {/* Sort Section */}
      <div className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 shadow-xl">
        <h2 className="font-bold text-lg text-cyan-400 mb-3">Sort By</h2>
        <select
          className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-gray-300 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="popularity" className="bg-zinc-800">
            Popularity
          </option>
          <option value="rating" className="bg-zinc-800">
            Rating
          </option>
          <option value="releaseDateAsc" className="bg-zinc-800">
            Release Date (Oldest)
          </option>
          <option value="releaseDateDesc" className="bg-zinc-800">
            Release Date (Newest)
          </option>
        </select>
      </div>

      {/* Filters Section */}
      <div className="bg-zinc-800 p-4 rounded-xl border border-zinc-700 shadow-xl">
        <h2 className="font-bold text-lg text-cyan-400 mb-3">Filters</h2>
        <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
          {genres.map((genre) => (
            <label
              key={genre}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                selectedGenre === genre
                  ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/30"
                  : "hover:bg-zinc-700/50"
              }`}
            >
              <input
                type="radio"
                name="genre"
                value={genre}
                checked={selectedGenre === genre}
                onChange={() => setSelectedGenre(genre)}
                className="form-radio h-4 w-4 text-cyan-500 border-zinc-500"
              />
              <span className="ml-3 text-gray-300">{genre}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
