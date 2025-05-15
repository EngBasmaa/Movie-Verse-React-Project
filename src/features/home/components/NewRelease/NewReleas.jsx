import React from "react";
import { MovieSection } from "../shared/MovieSection";
import { filterAnimation } from "../../../../shared/utils/movieUtils";

export default function NewReleas() {
  return (
    <MovieSection
      title="Animation"
      getMovies={filterAnimation}
      limit={20}
      navigationId="New-swiper-nav"
      overlayVariant="dark"
    />
  );
}
