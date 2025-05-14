import React from "react";
import { MovieSection } from "../shared/MovieSection";
import { filterHighRated } from "../../../../shared/utils/movieUtils";

export default function TopRated() {
  return (
    <MovieSection
      title="Top Rated"
      getMovies={filterHighRated}
      limit={20}
      navigationId="upcoming-swiper-nav"
      overlayVariant="blue"
    />
  );
}
