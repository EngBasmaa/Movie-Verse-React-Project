export const filterByGenre = (series, genre) => {
  return series.filter((seriesItem) => seriesItem.genres.includes(genre));
};

export const filterBySearch = (series, query) => {
  const lowercaseQuery = query.toLowerCase();
  return series.filter((seriesItem) =>
    seriesItem.title.toLowerCase().includes(lowercaseQuery)
  );
};

export const sortByRating = (series) => {
  return [...series].sort((a, b) => b.vote_average - a.vote_average);
};

export const sortByPopularity = (series) => {
  return [...series].sort((a, b) => b.popularity - a.popularity);
};

export const paginate = (series, page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return series.slice(startIndex, endIndex);
};
