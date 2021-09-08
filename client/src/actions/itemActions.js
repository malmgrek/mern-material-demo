import { GET_ITEMS, ADD_ITEM, REMOVE_ITEM, GET_ADDED_ITEMS } from "./types";
import { readFreeItems, takeItem, releaseItem } from "../services/itemServices";
import {
  addToLocalStorage,
  removeFromLocalStorage,
} from "../utils/localStorage";

export const getAvailableItems = () => {
  return async (dispatch) => {
    try {
      const {
        data: { data },
      } = await readFreeItems();
      dispatch({ type: GET_ITEMS, payload: data });
    } catch (err) {
      console.log("getAvailableItems", err);
    }
  };
};

export const addItemToReservations = (id, items) => {
  return async (dispatch) => {
    try {
      const { data } = await takeItem(id);
      dispatch({ type: ADD_ITEM, payload: data });

      const reservation = items.find((item) => item.id === id);
      addToLocalStorage(reservation);
    } catch (err) {
      console.log("removeaddItemToReservationsItem", err);
    }
  };
};

export const removeItem = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await releaseItem(id);
      dispatch({ type: REMOVE_ITEM, payload: data });
      removeFromLocalStorage(id);
    } catch (err) {
      console.log("removeItem", err);
    }
  };
};

export const getReservations = () => {
  return (dispatch) => {
    try {
      const data = JSON.parse(localStorage.getItem("reservations")) || [];
      dispatch({ type: GET_ADDED_ITEMS, payload: data });
    } catch (err) {
      console.log("getReservations", err);
    }
  };
};
