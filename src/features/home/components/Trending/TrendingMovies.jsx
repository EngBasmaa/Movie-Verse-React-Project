/* eslint-disable no-unused-vars */
import { MovieSection } from "../shared/MovieSection";
import { getTrendingMovies } from "../../../../shared/utils/movieUtils";

export function TrendingMovies() {
  return (
    <MovieSection
      title="Trending Now"
      getMovies={getTrendingMovies}
      limit={20}
      navigationId="trending-swiper-nav"
      overlayVariant="red"
    />
  );
}
