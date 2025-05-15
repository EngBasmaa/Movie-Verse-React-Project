import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Search, Bookmark, User, LogIn } from "lucide-react";
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
  const location = useLocation();

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

  useEffect(() => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  }, [location]);

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
    <header className="w-full border-b border-gray-700/50 bg-zinc-900/90 backdrop-blur-md sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 flex flex-col md:flex-row h-auto md:h-20 items-center justify-between py-3 md:py-0 gap-3 md:gap-0">
        {/* Left: Logo and nav */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/" className="flex items-center group">
            <img
              src={logo}
              alt="MovieDB Logo"
              className="h-24 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Hamburger menu for mobile */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-gray-800/50 transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Open menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          ref={mobileMenuRef}
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } md:hidden absolute top-20 left-0 right-0 bg-zinc-900/95 backdrop-blur-md border-t border-gray-700/50 z-40 animate-fade-in`}
        >
          <nav className="flex flex-col items-center py-4 gap-4">
            <Link
              to="/movies"
              className="text-lg font-medium text-gray-300 hover:text-white transition-colors px-6 py-2 rounded-lg hover:bg-gray-800/50 w-full text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Movies
            </Link>
            <Link
              to="/series"
              className="text-lg font-medium text-gray-300 hover:text-white transition-colors px-6 py-2 rounded-lg hover:bg-gray-800/50 w-full text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Series
            </Link>
            <Link
              to="/people"
              className="text-lg font-medium text-gray-300 hover:text-white transition-colors px-6 py-2 rounded-lg hover:bg-gray-800/50 w-full text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Actors
            </Link>
            <Link
              to="/watchlist"
              className="flex items-center justify-center gap-2 text-lg text-gray-300 hover:text-white transition-colors px-6 py-2 rounded-lg hover:bg-gray-800/50 w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Bookmark className="h-5 w-5" />
              <span>Watchlist</span>
            </Link>
            <div className="w-full border-t border-gray-700/50 pt-4 mt-2 flex flex-col items-center gap-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Search className="h-5 w-5" />
                <span>Search</span>
              </button>
              <Link
                to="/login"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </Link>
            </div>
          </nav>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            to="/movies"
            className="px-4 py-2 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all"
          >
            Movies
          </Link>
          <Link
            to="/series"
            className="px-4 py-2 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all"
          >
            Series
          </Link>
          <Link
            to="/people"
            className="px-4 py-2 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all"
          >
            Actors
          </Link>
          <Link
            to="/watchlist"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all"
          >
            <Bookmark className="h-5 w-5" />
            <span className="hidden sm:inline">Watchlist</span>
          </Link>
        </nav>

        {/* Right: Auth and search */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => {
              setIsSearchOpen(true);
              setTimeout(() => searchInputRef.current?.focus(), 100);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 hover:bg-gray-700/70 text-gray-300 hover:text-white transition-all"
            aria-label="Search movies"
          >
            <Search className="h-5 w-5" />
            <span className="text-sm">Search...</span>
            <kbd className="ml-2 text-xs bg-gray-700/50 px-2 py-1 rounded">
              Ctrl+K
            </kbd>
          </button>

          <Link
            to="/login"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-600 hover:bg-pink-700 text-white transition-all"
          >
            <User className="h-5 w-5" />
            <span>Login</span>
          </Link>
        </div>

        {/* Mobile search button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="md:hidden p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/70 text-white transition-colors"
          aria-label="Search movies"
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Search Modal */}
        {isSearchOpen && (
          <div
            className="fixed inset-0 backdrop-blur-sm bg-black/70 z-50 flex justify-center items-start pt-16 pb-8 animate-fade-in"
            onClick={handleBackdropClick}
          >
            <div
              className="w-[90vw] max-w-3xl bg-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] border border-gray-700/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Header */}
              <div className="sticky top-0 bg-gray-800 p-4 border-b border-gray-700/50 z-10">
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for movies, series, actors..."
                      className="w-full pl-12 pr-10 py-3 text-base border-0 focus:outline-none bg-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500/50"
                      autoFocus
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="p-2 rounded-lg hover:bg-gray-700/50 text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="hidden sm:inline mr-2">Esc</span>
                    <X className="h-5 w-5 inline" />
                  </button>
                </div>
              </div>

              {/* Search Results */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-900/50 min-h-[300px]">
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
                    message="Search movies & series"
                    sub="Type to find your favorite content"
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
    <div className="flex flex-col items-center justify-center h-[300px] text-gray-500">
      <Search className="h-12 w-12 mb-4 text-gray-600" />
      <h3 className="text-xl font-medium text-white">{message}</h3>
      {sub && <p className="text-gray-400 mt-2">{sub}</p>}
    </div>
  );
}
