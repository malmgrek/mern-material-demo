import jwt_decode from "jwt-decode";
import { login, register } from "../services/userServices";

import setAuthToken from "../utils/setAuthToken";
import { SET_CURRENT_USER } from "./types";

export const registerUser = (userData, history, setError) => {
  return async () => {
    try {
      await register(userData);
      history.push("/login");
    } catch (err) {
      console.log(err.message);
      setError("email", {
        message: "Email already exists",
      });
    }
  };
};

export const loginUser = (userData, setError) => {
  return async (dispatch) => {
    try {
      const res = await login(userData);
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    } catch (err) {
      setError("email");
      setError("password", {
        message: "Wrong email or password",
      });
    }
  };
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const logoutUser = () => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  return {
    type: "USER_LOGOUT",
  };
};
