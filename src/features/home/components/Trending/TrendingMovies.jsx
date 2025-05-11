/* eslint-disable no-unused-vars */
import { MovieSection } from "../shared/MovieSection";

export const getTrendingMovies = (movies, limit = 10) => {
  const sortedMovies = [...movies].sort((a, b) => b.popularity - a.popularity);
  return sortedMovies.slice(0, limit);
};
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
