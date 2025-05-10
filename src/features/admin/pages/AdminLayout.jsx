
import {  useState } from "react";
import { MyTable } from "../components/MyTable";
import { Sidebar } from "../components/Sidebar";

export function AdminLayout() {


  // const { movies, isLoading, errors } = useSelector(
  //   (store) => store.movieSlice
  // );

  const [activeTab, setActiveTab] = useState("movies");

  const AddNewSeries=()=>{
// add movie logic
  }
  const AddNewMovie = () => {
    // add series logic

  }

  

  return (
    <div className="grid grid-cols-12 min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="col-span-10 p-6">

      {activeTab === "dashboard" && (
          <>
             <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">All</h1>
              <h3 className="text-2xl font-bold text-red-800">Analysis Charts</h3>
            </div>
            <MyTable />
          </>
        )}


        {activeTab === "movies" && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Movies</h1>
              <button
                onClick={() => AddNewMovie(986056)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Add New Movie
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
                onClick={() => AddNewSeries(986056)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Add New Series
              </button>
            </div>
            <MyTable />
          </>
        )}
      </main>
    </div>
  );
}
