import {
  GET_ITEMS,
  ADD_ITEM,
  REMOVE_ITEM,
  GET_ADDED_ITEMS,
} from "../actions/types";

const initialState = {
  available: [],
  reservations: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS: {
      return {
        ...state,
        available: action.payload,
      };
    }
    case ADD_ITEM: {
      return {
        ...state,
        available: state.available.filter(
          (item) => item.id !== action.payload.id
        ),
        reservations: [
          ...state.reservations,
          state.available.find((item) => item.id === action.payload.id),
        ],
      };
    }
    case REMOVE_ITEM: {
      return {
        ...state,
        reservations: state.reservations.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    }
    case GET_ADDED_ITEMS: {
      return {
        ...state,
        reservations: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
