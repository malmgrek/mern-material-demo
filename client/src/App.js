import jwt_decode from "jwt-decode";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";

import AppBar from "./components/AppBar";
import Listing from "./components/Listing"; // Items listing
import LogIn from "./components/auth/LogIn";
import Register from "./components/auth/Register";
import PrivateRoute from "./components/PrivateRoute";
import Stash from "./components/Stash"; // TODO: Staging area
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  // Check for token fermentation to keep user logged in
  if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      dispatch(logoutUser());
      window.location.href = "./login";
    }
  }
  return (
    <Router>
      <AppBar />
      <Switch>
        <Route exact path={["/", "/login"]} component={LogIn} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/listing" component={Listing} />
        <PrivateRoute exact path="/stash" component={Stash} />
      </Switch>
    </Router>
  );
};

export default App;
