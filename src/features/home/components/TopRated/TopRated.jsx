import React from "react";
import { MovieSection } from "../shared/MovieSection";
import { getTrendingMovies } from "../../../../shared/utils/movieUtils";

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
