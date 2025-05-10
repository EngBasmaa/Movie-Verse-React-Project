import { useState } from "react";
import { MyTable } from "../components/MyTable";
import { Sidebar } from "../components/Sidebar";
import { Link } from "react-router-dom";
import { MdAddToPhotos } from "react-icons/md";
import { MyFilters } from "../components/MyFilters"; // تعديل هذا الاستيراد ليناسب الملف
import {
  filterByGenre,
  filterByCategory,
  filterByLang,
  filterBySearch,
  sortByPopularity,
  sortByRating,
  sortByReleaseDate,
} from "../../../shared/utils/movieUtils";
import { all } from "../components/localData";

export function AdminLayout() {
  const [activeTab, setActiveTab] = useState("movies");
  const [filteredData, setFilteredData] = useState(null);

  // Handle the filter change
  const handleFilterChange = (filters) => {
    let filteredMovies = all; // البداية مع جميع البيانات

    if (filters.genre) {
      filteredMovies = filterByGenre(filteredMovies, filters.genre);
    }
    if (filters.category) {
      filteredMovies = filterByCategory(filteredMovies, filters.category);
    }
    if (filters.language) {
      filteredMovies = filterByLang(filteredMovies, filters.language);
    }
    if (filters.searchQuery) {
      filteredMovies = filterBySearch(filteredMovies, filters.searchQuery);
    }


    // إضافة ترتيب حسب الشعبية أو التقييم أو تاريخ الإصدار إذا تم تحديده
    if (filters.sortBy === "popularity") {
      filteredMovies = sortByPopularity(filteredMovies);
    }
    if (filters.sortBy === "rating") {
      filteredMovies = sortByRating(filteredMovies);
    }
    if (filters.sortBy === "releaseDate") {
      filteredMovies = sortByReleaseDate(filteredMovies);
    }

    setFilteredData(filteredMovies); // تعيين البيانات المفلترة
  };

  return (
    <div className="grid grid-cols-12 min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="col-span-10 p-6">
        {/* Render the Filters component */}
        <MyFilters onFilterChange={handleFilterChange} />

        {activeTab === "dashboard" && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">All</h1>
              <h3 className="text-2xl font-bold text-red-800">Analysis Charts</h3>
            </div>
            <MyTable
              type="all"
              tableTitle="Movies & Series Table"
              movies={filteredData || all} // تمرير البيانات المفلترة إلى الجدول
            />
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
            <MyTable
              type="movie"
              tableTitle="Movies Table"
              movies={filteredData || all} // تمرير البيانات المفلترة إلى الجدول
            />
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
            <MyTable
              type="series"
              tableTitle="Series Table"
              movies={filteredData || all} 
            />
          </>
        )}
      </main>
    </div>
  );
}
