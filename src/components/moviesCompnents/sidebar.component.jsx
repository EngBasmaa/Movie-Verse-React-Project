import React from "react";

const genres = [
    'Everything', 'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance',
    'Science Fiction', 'TV Movie', 'Thriller', 'War', 'Western'
];

export function Sidebar({ selectedGenre, setSelectedGenre, sortOrder, setSortOrder }) {
    return (
        <aside className="md:col-span-1 space-y-4">
            <div className="bg-white p-4 rounded shadow">
                <h2 className="font-semibold mb-2">Sort</h2>
                <select
                    className="w-full border px-2 py-1"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="popularity">Popularity</option>
                    <option value="rating">Rating</option>
                    <option value="releaseDateAsc">ReleaseDate (asc)</option>
                    <option value="releaseDateDesc">ReleaseDate (desc)</option>
                </select>
            </div>

            <div className="bg-white p-4 rounded shadow">
                <h2 className="font-semibold mb-2">Where To Watch</h2>
                <p className="text-sm">36 Providers</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
                <h2 className="font-semibold mb-2">Filters</h2>
                <h3 className="border-s-4 p-1">Genre</h3>
                <div className="p-2 max-h-60 overflow-y-auto">
                    {genres.map((genre) => (
                        <label key={genre} className="block mb-1 cursor-pointer">
                            <input
                                type="radio"
                                name="genre"
                                value={genre}
                                checked={selectedGenre === genre}
                                onChange={() => setSelectedGenre(genre)}
                                className="mr-2"
                            />
                            {genre}
                        </label>
                    ))}
                </div>
            </div>
        </aside>
    );
}
