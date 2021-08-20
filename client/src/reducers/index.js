import { combineReducers } from "redux";

import authReducer from "./authReducer";
import itemReducer from "./itemReducer";

const appReducer = combineReducers({
  auth: authReducer,
  items: itemReducer,
});

// Reset redux to initial state when user logs out
//
// edited from Dan Abramovs answer
// https://stackoverflow.com/a/35641992
export const rootReducer = (state, action) =>
  appReducer(action.type === "USER_LOGOUT" ? undefined : state, action);
