// Filter series by genre
export const filterSeriesByGenre = (series, genre) => {
  if (!genre) return series;
  
  return series.filter((item) => {
    if (!item.genres) return false;
    
    const genres = Array.isArray(item.genres) 
      ? item.genres 
      : typeof item.genres === 'string' 
        ? [item.genres] 
        : [];
    
    return genres.some(g => 
      typeof g === 'string' 
        ? g.toLowerCase() === genre.toLowerCase() 
        : g.name?.toLowerCase() === genre.toLowerCase()
    );
  });
};

// Sort series by rating
export const sortSeriesByRating = (series) => {
  return [...series].sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
};

// Sort series by popularity
export const sortSeriesByPopularity = (series) => {
  return [...series].sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
};

// Sort series by release date
export const sortSeriesByReleaseDate = (series, order = 'desc') => {
  return [...series].sort((a, b) => {
    const dateA = a.first_air_date ? new Date(a.first_air_date) : new Date(0);
    const dateB = b.first_air_date ? new Date(b.first_air_date) : new Date(0);
    
    return order === 'asc' 
      ? dateA - dateB 
      : dateB - dateA;
  });
};

// Filter by search query
export const filterBySearch = (series, query) => {
  if (!query) return series;
  
  const lowerCaseQuery = query.toLowerCase();
  return series.filter(
    (item) => 
      item.title?.toLowerCase().includes(lowerCaseQuery) || 
      item.name?.toLowerCase().includes(lowerCaseQuery) ||
      item.overview?.toLowerCase().includes(lowerCaseQuery)
  );
};

// Paginate series
export const paginate = (series, page, limit) => {
  const startIndex = (page - 1) * limit;
  return series.slice(startIndex, startIndex + limit);
};
