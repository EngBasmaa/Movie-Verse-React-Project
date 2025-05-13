import React from "react";
import { MovieSection } from "../shared/MovieSection";
import { filterReleased } from "../../../../shared/utils/movieUtils";

export default function NewReleas() {
  return (
    <MovieSection
      title="New Realesed"
      getMovies={filterReleased}
      limit={20}
      navigationId="New-swiper-nav"
      overlayVariant="grey"
    />
  );
}
