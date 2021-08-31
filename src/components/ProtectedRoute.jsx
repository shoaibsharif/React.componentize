import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      component={user ? children : <Redirect to={{ pathname: "/login" }} />}
    />
  );
};

export default ProtectedRoute;
