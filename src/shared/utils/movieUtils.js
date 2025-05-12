// Filters
export const filterByGenre = (movies, genre) =>
  movies.filter(movie => movie.genres.includes(genre));

export const filterByCategory = (movies, category) =>
  movies.filter(movie => movie.category === category);

export const filterByLang = (movies, lang) =>
  movies.filter(movie => movie.original_language === lang);

export const filterBySearch = (movies, query) =>
  movies.filter(movie =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

export const filterUpcoming = movies => {
  const now = new Date();
  return movies.filter(movie => new Date(movie.release_date) > now);
};

export const filterUpcomingByCategory = movies =>
  movies.filter(movie => movie.category === "upcoming");
// SORT
export const sortByPopularity = movies =>
  [...movies].sort((a, b) => b.popularity - a.popularity);

export const sortByRating = movies =>
  [...movies].sort((a, b) => b.vote_average - a.vote_average);

export const sortByReleaseDate = movies =>
  [...movies].sort(
    (a, b) => new Date(b.release_date) - new Date(a.release_date)
  );

// ============Limit==========
export const getTrendingMovies = (movies, limit = 10) =>
  sortByPopularity(movies).slice(0, limit);

export const getByLimit = (movies, limit = 10) => {
  console.log(movies.slice(0, limit));
  return movies.slice(0, limit);
};
// must function take one parameter like movies or series
export const getByFunctionLimit = (fun, movies, limit = 10) => {
  return fun(movies).slice(0, limit);
};

// Paginate
export const paginate = (movies, page, limit) => {
  const start = (page - 1) * limit;
  return movies.slice(start, start + limit);
};
