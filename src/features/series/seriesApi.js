import axios from "axios";
import { API_URL_SERIES } from "../../shared/constants";

const getAllSeries = () => axios.get(API_URL_SERIES);

const getSeriesById = (seriesId) => axios.get(`${API_URL_SERIES}/${seriesId}`);

const addSeries = (series) => axios.post(API_URL_SERIES, series);

const editSeries = (seriesId, series) =>
  axios.put(`${API_URL_SERIES}/${seriesId}`, series);

const deleteSeries = (seriesId) => axios.delete(`${API_URL_SERIES}/${seriesId}`);

const searchSeries = (query) => {
  return axios.get(`${API_URL_SERIES}?title=${encodeURIComponent(query)}`);
};

export {
  getAllSeries,
  getSeriesById,
  addSeries,
  editSeries,
  deleteSeries,
  searchSeries,
};