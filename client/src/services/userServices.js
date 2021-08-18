import axios from "axios";

const baseUrl = "/api/users";

export const register = (userData) => {
  return axios.post(`${baseUrl}/register`, userData);
};

export const login = (userData) => {
  return axios.post(`${baseUrl}/login`, userData);
};
