/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { Hero } from "../components/Hero/Hero";
import { TrendingMovies } from "../components/Trending/TrendingMovies";
export function Home() {
  const { movies, isLoading, errors } = useSelector(
    (store) => store.movieSlice
  );
  console.log("HOME", movies, isLoading, errors);

  return (
    <>
      <div className="W-full min-h-screen  flex flex-col">
        {/* Hero */}
        <Hero></Hero>
        {/* Trending movies */}
        <TrendingMovies></TrendingMovies>
      </div>
    </>
  );
}
