import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MdAddToPhotos } from "react-icons/md";

import { MyTable } from "../components/MyTable";
import { MyFilters } from "../components/MyFilters";
import { MyHeader } from "../components/MyHeader";
import { MyChart } from "../components/MyChart";
import { MyPie } from "../components/MyPie";
import { MyBar } from "../components/MyBar";
import { Button } from "../../../shared/components/MyButton";

import {
  filterByGenre,
  filterBySearch,
  sortByRating,
  filterReleased,
} from "../../../shared/utils/movieUtils";

import {
  filterSeriesByGenre,
  sortSeriesByRating,
  sortSeriesByReleaseDate,
} from "../../../shared/utils/seriesUtils";

import { getAllMoviesAction } from "../../movies/movieSlice";
import { getAllSeriesAction } from "../../series/seriesSlice";

// فلترة حسب الفئة العمرية
function filterMovieByAudience(data, category) {
  if (category === "general") return data.filter((item) => !item.adult);
  if (category === "adults") return data.filter((item) => item.adult);
  return data;
}

function filterSeriesByAudience(data, category) {
  if (category === "general") return data.filter((item) => !item.adult);
  if (category === "adults") return data.filter((item) => item.adult);
  return data;
}

export function AdminLayout() {
  const { tab } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(
    tab === "series" || tab === "dashboard" ? tab : "movies"
  );
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { movies = [] } = useSelector((state) => state.movieSlice || {});
  const { series = [] } = useSelector((state) => state.seriesSlice || {});
  console.log(movies);
  console.log(series);
  useEffect(() => {
    if (tab === "movies" || tab === "series" || tab === "dashboard") {
      setActiveTab(tab);
    } else {
      setActiveTab("movies");
    }

    if (tab === "movies") {
      dispatch(getAllMoviesAction());
    } else if (tab === "series") {
      dispatch(getAllSeriesAction());
    } else {
      dispatch(getAllMoviesAction());
      dispatch(getAllSeriesAction());
    }

    setCurrentPage(1);
  }, [tab, dispatch]);

  // البيانات الأولية حسب التبويب
  const rawData = useMemo(() => {
    return activeTab === "movies" ? movies : series;
  }, [activeTab, movies, series]);

  // فلترة وفرز البيانات
  const filteredData = useMemo(() => {
    let result = [...rawData];

    if (filters.genre) {
      result =
        activeTab === "movies"
          ? filterByGenre(result, filters.genre)
          : filterSeriesByGenre(result, filters.genre);
    }

    if (filters.category) {
      result =
        activeTab === "movies"
          ? filterMovieByAudience(result, filters.category)
          : filterSeriesByAudience(result, filters.category);
    }

    if (filters.searchQuery) {
      result = filterBySearch(result, filters.searchQuery);
    }

    if (filters.sortBy === "rating") {
      result =
        activeTab === "movies"
          ? sortByRating(result)
          : sortSeriesByRating(result);
    }

    if (filters.sortBy === "releaseDate") {
      result =
        activeTab === "movies"
          ? filterReleased(result)
          : sortSeriesByReleaseDate(result);
    }

    return result;
  }, [rawData, filters, activeTab]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const isMoviesTab = activeTab === "movies";
  const isSeriesTab = activeTab === "series";
  const isDashboard = activeTab === "dashboard";

  const newItemPath = `/admin/0/${isMoviesTab ? "editMovie" : "editSeries"}`;

  return (
    <div className="flex">
      <main className="flex-1 shadow-2xl bg-zinc-800 w-full">
        <MyHeader
          activeTab={activeTab}
          onTabChange={(tab) => navigate(`/admin/${tab}`)}
        />

        {!isDashboard && (
          <div className="flex justify-around items-center mb-4 align-items-center align-content-center">
            <MyFilters
              filters={filters}
              setFilters={setFilters}
              onFilterChange={setFilters}
            />
          </div>
        )}

        {!isDashboard && (
          <Link
            to={newItemPath}
            className="flex items-center gap-2 w-50 ms-auto me-6 px-4 py-2  rounded-3xl bg-pink-700 text-white hover:text-red-200   hover:bg-pink-900 transition"
          >
            <MdAddToPhotos className="inline-block mr-2 size-6" />
            Add New {isMoviesTab ? "Movie" : "Series"}
          </Link>
        )}

        {isMoviesTab && (
          <>
            <MyTable
              type={isMoviesTab ? "movie" : "series"}
              tableTitle={isMoviesTab ? "All Movies" : "All Series"}
              data={paginatedData}
              pagination={{ currentPage, totalPages }}
              setPage={setCurrentPage}
            />

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6">
              <button
                className="px-4 py-2 mr-2  rounded-3xl bg-pink-700 text-white hover:text-red-200   hover:bg-pink-900 transition"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </button>
              <span className="px-4 py-2 text-white">
                {currentPage} of {totalPages}
              </span>
              <button
                className="px-4 py-2 mr-2  rounded-3xl bg-pink-700 text-white hover:text-red-200   hover:bg-pink-900 transition"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                Next
              </button>
            </div>

            <div className="px-6 py-8">
              <h2 className="text-4xl font-semibold text-white mb-6 border-b pb-2 border-gray-300 mt-6">
                🎬 Movies Statistics
              </h2>

              <div className=" p-4 mb-6">
                <MyChart movies={filteredData} />
              </div>
            </div>
          </>
        )}

        {isSeriesTab && (
          <>
            <MyTable
              type={isMoviesTab ? "movie" : "series"}
              tableTitle={isMoviesTab ? "All Movies" : "All Series"}
              data={paginatedData}
              pagination={{ currentPage, totalPages }}
              setPage={setCurrentPage}
            />

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6">
              <button
                className="px-4 py-2 mr-2  rounded-3xl bg-pink-700 text-white hover:text-red-200   hover:bg-pink-900 transition"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </button>
              <span className="px-4 py-2 text-white">
                {currentPage} of {totalPages}
              </span>
              <button
                className="px-4 py-2 mr-2  rounded-3xl bg-pink-700 text-white hover:text-red-200   hover:bg-pink-900 transition"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                Next
              </button>
            </div>

            <div className="px-6 py-8">
              <h2 className="text-4xl font-semibold text-white mb-6 border-b pb-2 border-gray-300 mt-6">
                📺 Series Statistics
              </h2>

              {/* Line Chart */}
              <div className=" p-4 mb-6">
                <MyChart series={filteredData} />
              </div>
            </div>
          </>
        )}

        {isDashboard && (
          <>
            {isDashboard && (
              <div className="px-4 md:px-6 py-6 space-y-8 overflow-hidden">
                {/* Comparison Section */}
                <section className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 pb-2 border-b border-gray-600">
                    📊 Movies vs Series
                  </h2>
                  <div className="p-3 md:p-4 overflow-hidden">
                    <MyBar movies={movies} series={series} />
                  </div>
                </section>

                {/* Movies Stats */}
                <section className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 pb-2 border-b border-gray-600">
                      🎬 Movies Analytics
                    </h2>
                    <div className="p-3 md:p-4  overflow-hidden">
                      <MyChart movies={movies} />
                    </div>
                  </div>

                  <div className="p-3 md:p-4 overflow-hidden">
                    <MyPie movies={movies} />
                  </div>
                </section>

                {/* Series Stats */}
                <section className="space-y-8 ">
                  <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 pb-2 border-b border-gray-600">
                      📺 Series Analytics
                    </h2>
                    <div className=" p-3 md:p-4  overflow-hidden">
                      <MyChart series={series} />
                    </div>
                  </div>

                  <div className=" p-3 md:p-4  overflow-hidden">
                    <MyPie series={series} />
                  </div>
                </section>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
