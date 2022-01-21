import React from "react";
import { Route, Redirect } from "react-router";
import { isAuthenticated } from "../../helpers/storage&cookies/storage&cookies";

//AUTHENTICATED PRIVATE ROUTE (FOR ADMIN AND STANDARD USER) --> IF NOT AUTHENTICATED REDIRECT TO HOMEPAGE

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
