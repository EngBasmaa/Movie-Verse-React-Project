import { useEffect, useState } from "react";
import { MyTable } from "../components/MyTable";
import { Sidebar } from "../components/Sidebar";
import { Link } from "react-router-dom";
import { MdAddToPhotos } from "react-icons/md";
import { MyFilters } from "../components/MyFilters"; // تعديل هذا الاستيراد ليناسب الملف
import {
  filterByGenre,
  
  filterBySearch,
  sortByRating,
  sortByReleaseDate,
} from "../../../shared/utils/movieUtils";
import { useSelector } from "react-redux";
import { MyHeader } from "../components/MyHeader";

export function AdminLayout() {
  const [activeTab, setActiveTab] = useState("movies");
  const [filteredData, setFilteredData] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { movies } = useSelector((store) => store.movieSlice);

  const totalPages = Math.ceil(((filteredData || movies || []).length) / itemsPerPage);


  useEffect(() => {
    setFilteredData(movies);

  }, [movies]);

  const paginate = (items, page, limit) => {
    const start = (page - 1) * limit;
    return items.slice(start, start + limit);
  };

  const paginatedData = paginate(filteredData ?? movies, currentPage, itemsPerPage);

function filterByCategory(movies, category) {
  if (category === "general") {
    return movies.filter(movie => movie.adult === false);
  }
  if (category === "adults") {
    return movies.filter(movie => movie.adult === true);
  }
  return movies; // لو مفيش فلتر مطبق
}
  // Handle the filter change
  const handleFilterChange = (filters) => {
    let filteredMovies = movies;

    if (filters.genre) {
      filteredMovies = filterByGenre(filteredMovies, filters.genre);
    }
    if (filters.category) {
      filteredMovies = filterByCategory(filteredMovies, filters.category);
    }
    if (filters.searchQuery) {
      filteredMovies = filterBySearch(filteredMovies, filters.searchQuery);
    }
    if (filters.sortBy === "rating") {
      filteredMovies = sortByRating(filteredMovies);
    }
    if (filters.sortBy === "releaseDate") {
      filteredMovies = sortByReleaseDate(filteredMovies);
    }

    setFilteredData(filteredMovies);  
    setCurrentPage(1);
  };

  return (
    
    <div className="grid grid-cols-12 min-h-screen bg-gray-100">


        {/* Sidebar يظهر فقط على الشاشات الكبيرة */}
        <div className="hidden lg:block col-span-2">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Header يظهر فقط على الشاشات الصغيرة */}
      <div className="block lg:hidden col-span-12">
        <MyHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      

      <main className="col-span-12 lg:col-span-10 p-6">

        {activeTab === "dashboard" && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">All</h1>
              <h3 className="text-2xl font-bold text-red-800">Analysis Charts</h3>
            </div>
            <MyFilters onFilterChange={handleFilterChange} />
            <MyTable
              type="all"
              tableTitle="Movies & Series Table"
              data={paginatedData || movies}
              pagination={{ currentPage, totalPages }}
              setPage={setCurrentPage}            />
          </>
        )}

        {activeTab === "movies" && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Movies</h1>
              <Link
                to="/admin/0/editMovie"
                className="inline-block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mb-4"
              >
                <MdAddToPhotos className="inline-block mr-2 size-6" /> Add New Movie
              </Link>
            </div>
            <MyFilters onFilterChange={handleFilterChange} />

            <MyTable
              type="movie"
              tableTitle="Movies Table"
              data={paginatedData || movies}
              pagination={{ currentPage, totalPages }}
              setPage={setCurrentPage}            />
          </>
        )}

        {activeTab === "series" && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Series</h1>
              <Link
                to="/admin/0/editSeries"
                className="inline-block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mb-4"
              >
                <MdAddToPhotos className="inline-block mr-2 size-6" /> Add New Series
              </Link>
            </div>
            <MyFilters onFilterChange={handleFilterChange} />

            <MyTable
              type="series"
              tableTitle="Series Table"
              data={paginatedData || movies}
              pagination={{ currentPage, totalPages }}
              setPage={setCurrentPage}
            />
          </>
        )}
      </main>
    </div>
  );
}
