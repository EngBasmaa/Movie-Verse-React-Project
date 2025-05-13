import React, { useEffect } from "react";
import MainLayout from "./layout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesAction } from "../features/movies/movieSlice";
import { getAllSeriesAction } from "../features/series/seriesSlice";

export default function App() {
  // Shared Data
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movieSlice.movies);
  const { series } = useSelector((store) => store.seriesSlice);

  useEffect(() => {
    if (!movies || movies.length === 0) {
      dispatch(getAllMoviesAction());
    }
    if (!series || series.length === 0) {
      dispatch(getAllSeriesAction());
    }
  }, [dispatch, movies, series]);
  return <MainLayout />;
}
