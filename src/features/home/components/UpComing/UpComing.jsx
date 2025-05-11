import React from "react";
import { MovieSection } from "../shared/MovieSection";
import { filterUpcoming } from "../../../../shared/utils/movieUtils";

export default function UpComing() {
  return (
    <MovieSection
      title="Coming Soon"
      getMovies={filterUpcoming}
      navigationId="Upcoming-swiper-nav"
      overlayVariant="dark"
    />
  );
}
