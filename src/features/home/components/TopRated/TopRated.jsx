import React from "react";
import { MovieSection } from "../shared/MovieSection";

export const getTrendingMovies = (movies, limit = 10) => {
  const sortedMovies = [...movies].sort((a, b) => b.popularity - a.popularity);
  return sortedMovies.slice(0, limit);
};
export default function TopRated() {
  return (
    <MovieSection
      title="Top Rated"
      getMovies={getTrendingMovies}
      limit={20}
      navigationId="top-swiper-nav"
      overlayVariant="red"
    />
  );
}
