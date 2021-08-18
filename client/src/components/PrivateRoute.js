import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...restParams }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Route
      {...restParams}
      render={(props) =>
        isAuthenticated 
        ? <Component {...props} /> 
        : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
