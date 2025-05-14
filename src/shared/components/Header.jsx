import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Search } from "lucide-react";
import logo from "../../assets/Logo-with-text.png";
import { MovieCard } from "./MovieCard";
import { filterBySearch } from "../utils/movieUtils";
import { getAllSeries } from "../../features/series/seriesApi";
import { getAllMovies } from "../../features/movies/movieApi";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const searchInputRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [moviesRes, seriesRes] = await Promise.all([
          getAllMovies(),
          getAllSeries(),
        ]);

        const combined = [
          ...moviesRes.data.map((m) => ({ ...m, type: "movie" })),
          ...seriesRes.data.map((s) => ({ ...s, type: "series" })),
        ];

        setAllMovies(combined);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      const filtered = filterBySearch(allMovies, searchQuery);
      setSearchResults(filtered);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, allMovies]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsSearchOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuRef]);

  return (
    <header className="w-full border-b border-gray-700 flex justify-center bg-gray-900 sticky top-0 z-50">
      <div className="w-[90%] max-w-7xl flex flex-col md:flex-row h-auto md:h-20 items-center justify-between py-4 md:py-0 gap-4 md:gap-0">
        {/* Left: Logo and nav */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="MovieDB Logo"
              className="h-24 w-auto object-contain filter"
            />
          </Link>

          {/* Hamburger menu for mobile */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-gray-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          ref={mobileMenuRef}
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } md:hidden absolute top-20 left-0 right-0 bg-gray-900 border-t border-gray-700 z-40`}
        >
          <nav className="flex flex-col items-center py-4 gap-4">
            <Link
              to="/movies"
              className="text-base font-medium text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Movies
            </Link>
            <Link
              to="/people"
              className="text-base font-medium text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Actors
            </Link>
            <Link
              to="/watchlist"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              <span>Watchlist</span>
            </Link>
          </nav>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/movies"
            className="text-base font-medium text-gray-300 hover:text-white transition-colors"
          >
            Movies
          </Link>
          <Link
            to="/people"
            className="text-base font-medium text-gray-300 hover:text-white transition-colors"
          >
            Actors
          </Link>
          <Link
            to="/watchlist"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <span className="hidden sm:inline">Watchlist</span>
          </Link>
        </nav>

        {/* Right: Auth and search */}
        <div className="flex flex-wrap md:flex-nowrap items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors text-white"
            aria-label="Search movies"
          >
            <Search className="h-5 w-5" />
          </button>

          <div className="flex gap-4">
            <Link
              to="/login"
              className="text-base font-medium text-gray-300 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-base font-medium text-gray-300 hover:text-white transition-colors"
            >
              Register
            </Link>
          </div>
        </div>

        {/* Search Modal */}
        {isSearchOpen && (
          <div
            className="fixed inset-0 backdrop-blur-sm bg-black/50 z-50 flex justify-center items-start pt-12 pb-8"
            onClick={handleBackdropClick}
          >
            <div
              className="w-[90vw] max-w-[800px] bg-gray-800 rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Header */}
              <div className="sticky top-0 bg-gray-800 p-4 border-b border-gray-700 z-10">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search movies by title..."
                      className="w-full pl-10 pr-8 py-3 text-base border-0 focus:outline-none bg-transparent text-white placeholder-gray-400"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="p-2 rounded-full hover:bg-gray-700 text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Search Results */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-900 min-h-[400px]">
                {searchQuery ? (
                  searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {searchResults.map((item) => (
                        <MovieCard
                          key={item.id}
                          imageUrl={
                            item.poster_path
                              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                              : "/placeholder-movie.jpg"
                          }
                          title={item.type === "movie" ? item.title : item.name}
                          rating={
                            item.vote_average ? Number(item.vote_average) : 0
                          }
                          releaseDate={
                            item.release_date ||
                            item.first_air_date ||
                            "2023-01-01"
                          }
                          className="hover:scale-[1.02] transition-transform"
                          showPlayButton={true}
                          id={item.id}
                          typeOfCard={item.type}
                        />
                      ))}
                    </div>
                  ) : (
                    <NoResults message="No results found" />
                  )
                ) : (
                  <NoResults
                    message="Search movies"
                    sub="Type to find your favorite films"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function NoResults({ message, sub }) {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] text-gray-500 dark:text-gray-400">
      <Search className="h-12 w-12 mb-4" />
      <h3 className="text-xl font-medium">{message}</h3>
      {sub && <p>{sub}</p>}
    </div>
  );
}
