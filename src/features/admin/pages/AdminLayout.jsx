import { useDispatch } from "react-redux";
import { deleteMovieAction } from "../../movies/movieSlice";
import { useEffect, useState } from "react";
import { MyTable } from "../components/MyTable";
import { Sidebar } from "../components/Sidebar";

export function AdminLayout() {
  // const { movies, isLoading, errors } = useSelector(
  //   (store) => store.movieSlice
  // );
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("movies");

  useEffect(() => {
    // ممكن تستدعي هنا جلب الداتا مش الحذف
    // dispatch(fetchMoviesAction());
  }, []);

  const deleteHandler = (movieId) => {
    dispatch(deleteMovieAction(movieId));
  };

  return (
    <div className="grid grid-cols-12 min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="col-span-10 p-6">

      {activeTab === "dashboard" && (
          <>
             <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">All</h1>
              <button
                onClick={() => deleteHandler(986056)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete Dummy Movie
              </button>
            </div>
            <MyTable />
          </>
        )}


        {activeTab === "movies" && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Movies</h1>
              <button
                onClick={() => deleteHandler(986056)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete Dummy Movie
              </button>
            </div>
            <MyTable />
          </>
        )}

     

        {activeTab === "series" && (
          <>
             <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Series</h1>
              <button
                onClick={() => deleteHandler(986056)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete Dummy Movie
              </button>
            </div>
            <MyTable />
          </>
        )}
      </main>
    </div>
  );
}
