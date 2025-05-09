import axios from "axios";
import { API_URL_MOVIES } from "../../shared/constants";

const getAllMovies = () => axios.get(API_URL_MOVIES);

const getMovieById = (movieId) => axios.get(`${API_URL_MOVIES}/${movieId}`);

const addMovie = (movie) => axios.post(API_URL_MOVIES, movie);

const editMovie = (movieId, movie) =>
  axios.put(`${API_URL_MOVIES}/${movieId}`, movie);

const deleteMovie = (movieId) => axios.delete(`${API_URL_MOVIES}/${movieId}`);

const searchMovies = (query) => {
  return axios.get(`${API_URL_MOVIES}?title=${encodeURIComponent(query)}`);
};
export {
  getAllMovies,
  getMovieById,
  addMovie,
  editMovie,
  deleteMovie,
  searchMovies,
};
