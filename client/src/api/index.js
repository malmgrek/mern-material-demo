import axios from "axios";


const createItem = payload => axios.post("/api/items", payload);
const readFreeItems = () => axios.get("/api/items/free");
const readTakenItems = () => axios.get(`/api/items/taken`);
const releaseItem = id => axios.get(`/api/items/release/${id}`);
const takeItem = id => axios.get(`/api/items/take/${id}`);


const interfaces = {
  createItem,
  readFreeItems,
  readTakenItems,
  releaseItem,
  takeItem
};

export default interfaces;
