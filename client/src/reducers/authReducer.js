import { SET_CURRENT_USER, USER_LOADING } from "../actions/types";
import empty from "is-empty";


const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !empty(action.payload),
        user: action.payload
      }
    case USER_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}


export default reducer;
