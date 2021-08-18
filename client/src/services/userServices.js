import axios from "axios";

const url = "/api/users";

export const register = (userData) => axios.post(`${url}/register`, userData);
export const login = (userData) => axios.post(`${url}/login`, userData);
