import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MdAddToPhotos } from "react-icons/md";

import { MyTable } from "../components/MyTable";
import { MyFilters } from "../components/MyFilters";
import { MyHeader } from "../components/MyHeader";
import { MyChart } from "../components/MyChart";
import { MyPie } from "../components/MyPie";

import {
  filterByGenre,
  filterBySearch,
  sortByRating,
  sortByReleaseDate
} from "../../../shared/utils/movieUtils";

import {
  filterSeriesByGenre,
  sortSeriesByRating,
  sortSeriesByReleaseDate
} from "../../../shared/utils/seriesUtils";

import { getAllMoviesAction } from "../../movies/movieSlice";
import { getAllSeriesAction } from "../../series/seriesSlice";

// دوال الفلترة حسب الفئة العمرية
function filterMovieByAudience(data, category) {
  if (category === "general") return data.filter(item => !item.adult);
  if (category === "adults") return data.filter(item => item.adult);
  return data;
}

function filterSeriesByAudience(data, category) {
  if (category === "general") return data.filter(item => !item.adult);
  if (category === "adults") return data.filter(item => item.adult);
  return data;
}

export function AdminLayout() {
  const { tab } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(
    tab === "series" ? "series" : "movies"
  );
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { movies = [] } = useSelector(state => state.movieSlice || {});
  const { series = [] } = useSelector(state => state.seriesSlice || {});

  // استخدم useMemo لحساب البيانات حسب التبويب النشط (movies أو series)
  const rawData = useMemo(
    () => {
      return activeTab === "movies" ? movies : series;
    },
    [activeTab, movies, series]
  );

  // إعادة تعيين الصفحة الأولى عند تغيير الفلاتر أو التبويب
  const dispatch = useDispatch();
  useEffect(
    () => {
      setCurrentPage(1);
      setActiveTab(tab === "series" ? "series" : (tab === "movies"?"movies":"dashboard"));
      if (tab === "movies") {
        dispatch(getAllMoviesAction());
      } else if (tab === "series") {
        dispatch(getAllSeriesAction());
      } else {
        dispatch(getAllMoviesAction());
        dispatch(getAllSeriesAction());
      }
    },
    [tab, dispatch]
  );

  // استخدم useMemo لتطبيق الفلاتر والفرز على البيانات
  const filteredData = useMemo(
    () => {
      let result = [...rawData];

      // فلتر الفئة Genre
      if (filters.genre) {
        result =
          activeTab === "movies"
            ? filterByGenre(result, filters.genre)
            : filterSeriesByGenre(result, filters.genre);
      }

      // فلتر الفئة العمرية Category
      if (filters.category) {
        result =
          activeTab === "movies"
            ? filterMovieByAudience(result, filters.category)
            : filterSeriesByAudience(result, filters.category);
      }

      // فلتر البحث Search
      if (filters.searchQuery) {
        result = filterBySearch(result, filters.searchQuery);
      }

      // فلتر التصنيف Rating
      if (filters.sortBy === "rating") {
        result =
          activeTab === "movies"
            ? sortByRating(result)
            : sortSeriesByRating(result);
      }

      // فلتر تاريخ الإصدار Release Date
      if (filters.sortBy === "releaseDate") {
        result =
          activeTab === "movies"
            ? sortByReleaseDate(result)
            : sortSeriesByReleaseDate(result);
      }

      return result;
    },
    [rawData, filters, activeTab]
  );

  // حساب البيانات المعروضة حسب الصفحة الحالية
  const paginatedData = useMemo(
    () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return filteredData.slice(startIndex, endIndex);
    },
    [filteredData, currentPage]
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return <div className="flex">
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">
        <MyHeader activeTab={activeTab} onTabChange={tab => navigate(`/admin/${tab}`)} />
        <div className="flex justify-around items-center mb-4 align-items-center align-content-center">
          <MyFilters filters={filters} setFilters={setFilters} onFilterChange={setFilters} />
        </div>
        <Link to={`/admin/0/${activeTab === "movies" ? "editMovie" : "editSeries"}`} className="flex items-center gap-2 w-50 ms-auto me-6 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
          <MdAddToPhotos className="inline-block mr-2 size-6" />
          Add New {activeTab === "movies" ? "Movie" : "Series"}
        </Link>

        {activeTab === "movies" && <MyChart movies={filteredData} />}
        {activeTab === "movies" && <MyPie movies={filteredData} />}
        {activeTab === "series" && <MyChart series={filteredData} />}
        {activeTab === "series" && <MyPie series={filteredData} />}

      {activeTab === "dashboard" &&
        (<>
          {activeTab === "movies" && <MyChart movies={filteredData} />}
        {activeTab === "movies" && <MyPie movies={filteredData} />}
        {activeTab === "series" && <MyChart series={filteredData} />}
        {activeTab === "series" && <MyPie series={filteredData} />}

      </>)
      
      }

        <MyTable type={activeTab === "movies" ? "movie" : "series"} tableTitle={activeTab === "movies" ? "All Movies" : "All Series"} data={paginatedData} pagination={{ currentPage, totalPages }} setPage={setCurrentPage} />
        {/* Pagination Controls */}
        <div className="flex justify-center mt-6">
          <button className="px-4 py-2 mr-2 bg-gray-300 rounded-md" disabled={currentPage === 1} onClick={() => setCurrentPage(
                prev => Math.max(prev - 1, 1)
              )}>
            Previous
          </button>
          <span className="px-4 py-2">
            {currentPage} of {totalPages}
          </span>
          <button className="px-4 py-2 ml-2 bg-gray-300 rounded-md" disabled={currentPage === totalPages} onClick={() => setCurrentPage(
                prev => Math.min(prev + 1, totalPages)
              )}>
            Next
          </button>
        </div>
      </main>
    </div>
}
