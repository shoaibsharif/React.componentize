import React from "react";
import { Redirect, Route } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../lib/auth";

const ProtectedRoute = ({ children, ...rest }) => {
  const { user, loading } = useAuth();
  console.log(user);
  if (!loading) {
    if (!user) toast.error("You need to login");
    return (
      <Route
        {...rest}
        render={({ location }) =>
          user ? (
            children
          ) : (
            <Redirect to={{ pathname: "/login", state: { from: location } }} />
          )
        }
      />
    );
  }
  return null;
};

export default ProtectedRoute;
