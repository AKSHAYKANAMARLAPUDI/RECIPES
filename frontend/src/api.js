import axios from "axios";

const API_URL = "http://localhost:5000/api/recipes";

export const getRecipes = (page = 1, limit = 15) =>
  axios.get(`${API_URL}?page=${page}&limit=${limit}`);

export const searchRecipes = (filters) =>
  axios.get(`${API_URL}/search`, { params: filters });
