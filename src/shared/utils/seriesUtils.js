export const filterSeriesByGenre = (series, genre) => {
  return series.filter((seriesItem) => seriesItem.genres.includes(genre));
};

export const filterBySearch = (series, query) => {
  const lowercaseQuery = query.toLowerCase();
  return series.filter((seriesItem) =>
    seriesItem.title.toLowerCase().includes(lowercaseQuery)
  );
};

export const sortSeriesByRating = (series) => {
  return [...series].sort((a, b) => b.vote_average - a.vote_average);
};

export const sortSeriesByPopularity = (series) => {
  return [...series].sort((a, b) => b.popularity - a.popularity);
};

export const sortSeriesByReleaseDate = (series, order = "desc") =>
  [...series].sort((a, b) =>
    order === "asc"
      ? new Date(a.release_date) - new Date(b.release_date)
      : new Date(b.release_date) - new Date(a.release_date)
  );

export const paginate = (series, page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return series.slice(startIndex, endIndex);
};
