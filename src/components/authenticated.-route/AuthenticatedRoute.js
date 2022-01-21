import React from "react";
import { Route, Redirect } from "react-router";
import { isAuthenticated } from "../../helpers/storage&cookies/storage&cookies";

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default AuthenticatedRoute;
