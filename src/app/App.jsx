import React, { useEffect } from "react";
import MainLayout from "./layout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesAction } from "../features/movies/movieSlice";

export default function App() {
  // Shared Data
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movieSlice.movies);

  useEffect(() => {
    if (!movies || movies.length === 0) {
      dispatch(getAllMoviesAction());
    }
  }, [dispatch, movies]);
  return <MainLayout />;
}
