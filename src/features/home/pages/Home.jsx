/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import { Hero } from "../components/Hero/Hero";
import { TrendingMovies } from "../components/Trending/TrendingMovies";
import UpComing from "../components/UpComing/UpComing";
import TopCategories from "../components/TopCategeory/TopCategory";
import FreeContentSection from "../components/FreeContent/FreeContentSection";
import TopRated from "../components/TopRated/TopRated";
import NewReleas from "../components/NewRelease/NewReleas";

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
        {/* <TopCategories></TopCategories> */}
        <UpComing></UpComing>
        <FreeContentSection></FreeContentSection>
        <NewReleas></NewReleas>
        <TopRated></TopRated>
      </div>
    </>
  );
}
