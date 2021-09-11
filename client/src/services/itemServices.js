import axios from "axios";

const url = "/api/items";

export const createItem = (payload) => axios.post(url, payload);
export const readFreeItems = () => axios.get(`${url}/free`);
export const readTakenItems = () => axios.get(`${url}/taken`);
export const releaseItem = (id) => axios.get(`${url}/release/${id}`);
export const takeItem = (id) => axios.get(`${url}/take/${id}`);
