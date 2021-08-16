import jwt_decode from "jwt-decode";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";

import AppBar from "./components/AppBar";
import Listing from "./components/Listing"; // Items listing
import LogIn from "./components/LogIn";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./components/Register";
import Stash from "./components/Stash"; // TODO: Staging area

// Check for token fermentation to keep user logged in
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppBar />
        <Switch>
          <Route exact path={["/", "/login"]} component={LogIn} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/listing" component={Listing} />
          <PrivateRoute exact path="/stash" component={Stash} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
