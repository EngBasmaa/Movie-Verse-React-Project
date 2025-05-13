import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Settings, Search, X } from "lucide-react";
import logo from "../../assets/Logo-with-text.png";
import { Button } from "./MyButton";
import { MovieCard } from "./MovieCard";
import { filterBySearch } from "../utils/movieUtils";
import { getAllMovies } from "../../features/movies/movieApi";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const searchInputRef = useRef(null);

  useEffect(() => {
    async function loadMovies() {
      try {
        const res = await getAllMovies();
        const data = res.data;
        setAllMovies(data);
      } catch (error) {
        console.error("Error loading movies:", error);
      }
    }

    loadMovies();
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
  return (
    <header className="w-full border-b flex justify-center">
  <div className="w-[90%] max-w-7xl flex flex-wrap md:flex-nowrap h-auto md:h-20 items-center justify-between py-4 md:py-0 gap-4 md:gap-0">
    
    {/* Left: Logo and nav */}
    <div className="flex flex-wrap items-center gap-4 md:gap-8 w-full md:w-auto justify-between md:justify-start">
      <Link to="/" className="flex items-center">
        <img
          src={logo}
          alt="MovieDB Logo"
          className="h-10 w-auto object-contain"
        />
      </Link>

      <Button
        asChild
        variant="secondary"
        size="sm"
        className="!bg-[#E91E63] shadow-lg rounded-3xl hover:!bg-[#E91E63] px-4 py-2"
      >
        <Link to="/featured">Featured</Link>
      </Button>

      <nav className="hidden md:flex items-center gap-6">
        <Link
          to="/top-categories"
          className="text-base font-medium hover:text-primary transition-colors"
        >
          Top Categories
        </Link>
        <Link
          to="/categories"
          className="text-base font-medium hover:text-primary transition-colors"
        >
          All Categories
        </Link>
        <Link
          to="/pricing"
          className="text-base font-medium hover:text-primary transition-colors"
        >
          Pricing
        </Link>
      </nav>
    </div>

    {/* Right: Auth and search */}
    <div className="flex flex-wrap md:flex-nowrap items-center gap-4 w-full md:w-auto justify-between md:justify-end">
      <button
        onClick={() => setIsSearchOpen(true)}
        className="p-2 rounded-full hover:bg-accent transition-colors"
        aria-label="Search movies"
      >
        <Search className="h-5 w-5" />
      </button>

      <Link
        to="/login"
        className="text-base font-medium hover:text-primary transition-colors"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="text-base font-medium hover:text-primary transition-colors"
      >
        Register
      </Link>

      <button className="text-gray-500 hover:text-primary transition-colors ml-2">
        <Settings className="h-6 w-6" />
      </button>
    </div>

    {/* Search Modal is already responsive */}
    {isSearchOpen && (
      <div
        className="fixed inset-0 backdrop-blur-sm z-50 flex justify-center items-start pt-12 pb-8"
        onClick={handleBackdropClick}
      >
        <div
          className="w-[90vw] max-w-[800px] bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-900 p-4 border-b dark:border-gray-800 z-10">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies by title..."
                  className="w-full pl-10 pr-8 py-3 text-base border-0 focus:outline-none bg-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                  >
                    ×
                  </button>
                )}
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Search Results */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-950 min-h-[400px]">
            {searchQuery ? (
              searchResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      imageUrl={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : "/placeholder-movie.jpg"
                      }
                      title={movie.title || movie.original_title}
                      rating={
                        movie.vote_average ? Number(movie.vote_average) : 0
                      }
                      releaseDate={movie.release_date || "2023-01-01"}
                      className="hover:scale-[1.02] transition-transform"
                      showPlayButton={true}
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
