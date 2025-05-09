import axios from "axios";
import { API_URL_PEOPLE } from "../../shared/constants";

const getAllPeople = () => axios.get(API_URL_PEOPLE);

const getPersonById = (personId) => axios.get(`${API_URL_PEOPLE}/${personId}`);

const addPerson = (person) => axios.post(API_URL_PEOPLE, person);

const editPerson = (personId, person) =>
  axios.put(`${API_URL_PEOPLE}/${personId}`, person);

const deletePerson = (personId) => axios.delete(`${API_URL_PEOPLE}/${personId}`);

const searchPeople = (query) => {
  return axios.get(`${API_URL_PEOPLE}?name=${encodeURIComponent(query)}`);
};

export {
  getAllPeople,
  getPersonById,
  addPerson,
  editPerson,
  deletePerson,
  searchPeople,
};