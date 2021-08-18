import axios from "axios";

const baseUrl = "/api/items";

export const createItem = (payload) => axios.post(baseUrl, payload);
export const readFreeItems = () => axios.get(`${baseUrl}/free`);
export const readTakenItems = () => axios.get(`${baseUrl}/taken`);
export const releaseItem = (id) => axios.get(`${baseUrl}/release/${id}`);
export const takeItem = (id) => axios.get(`${baseUrl}/take/${id}`);
