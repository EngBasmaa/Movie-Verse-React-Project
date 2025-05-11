import React from "react";
import { MovieSection } from "../shared/MovieSection";
import { filterUpcoming } from "../../../../shared/utils/movieUtils";

export default function UpComing() {
  return (
    <MovieSection
      title="Upcoming"
      getMovies={filterUpcoming}
      limit={20}
      navigationId="upcoming-swiper-nav"
      overlayVariant="blue"
    />
  );
}
