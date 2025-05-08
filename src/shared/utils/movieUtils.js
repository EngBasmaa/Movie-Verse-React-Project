export const filterByGenre = (movies, genre) => {
  return movies.filter((movie) => movie.genres.includes(genre));
};

export const filterByCategory = (movies, category) => {
  return movies.filter((movie) => movie.category === category);
};

export const filterBySearch = (movies, query) => {
  return movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );
};
export const sortByReleaseDate = (movies, order = "desc") => {
  return [...movies].sort((a, b) =>
    order === "asc"
      ? new Date(a.release_date) - new Date(b.release_date)
      : new Date(b.release_date) - new Date(a.release_date)
  );
};

export const sortByPopularity = (movies) => {
  return [...movies].sort((a, b) => b.popularity - a.popularity);
};

export const sortByRating = (movies) => {
  return [...movies].sort((a, b) => b.vote_average - a.vote_average);
};
export const filterUpcoming = (movies) => {
  const now = new Date();
  return movies.filter((movie) => new Date(movie.release_date) > now);
};

export const filterReleased = (movies) => {
  const now = new Date();
  return movies.filter((movie) => new Date(movie.release_date) <= now);
};
export const getTrendingMovies = (movies, limit = 10) => {
  return sortByPopularity(movies).slice(0, limit);
};
export const paginate = (movies, page, limit = 10) => {
  const start = (page - 1) * limit;
  return movies.slice(start, start + limit);
};
