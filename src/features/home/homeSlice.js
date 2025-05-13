export const getTrendingMovies = (movies, limit = 10) => {
  const sortedMovies = [...movies].sort((a, b) => b.popularity - a.popularity);
  return sortedMovies.slice(0, limit);
};
