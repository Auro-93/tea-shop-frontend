import React from "react";
import { Switch, Route } from "react-router";
import { useHistory } from "react-router-dom";
import * as Page from "./index.js";
import ErrorPage from "../helpers/error-page/ErrorPage";
import {
  AdminRoute,
  UserRoute,
  User_Guest_Route,
  AuthenticatedRoute,
} from "../components/index.js";
import { isAuthenticated } from "../helpers/storage&cookies/storage&cookies.js";

const Pages = () => {
  let history = useHistory();

  if (
    isAuthenticated() &&
    (window.location.pathname === "/sign-in" ||
      window.location.pathname === "/sign-up")
  ) {
    history.push("/");
  }

  return (
    <Switch>
      <Route exact path="/" component={Page.Products} />
      <Route
        exact
        path="/products/:productSlug/:productId"
        component={Page.ProductDetails}
      />
      <User_Guest_Route exact path="/contact-us" component={Page.ContactUs} />
      <User_Guest_Route exact path="/cart" component={Page.Cart} />
      <User_Guest_Route exact path="/wishlist" component={Page.Wishlist} />
      <User_Guest_Route exact path="/checkout" component={Page.Checkout} />

      <AuthenticatedRoute
        exact
        path={`/${
          isAuthenticated().role === 0 ? "user" : "admin"
        }/dashboard/privacy-settings`}
        component={Page.AccountPrivacySettings}
      />
      <UserRoute exact path="/user/dashboard" component={Page.UserProfile} />
      <UserRoute
        exact
        path="/user/dashboard/orders"
        component={Page.UserOrders}
      />
      <UserRoute
        exact
        path="/user/dashboard/reviews/add-review/:reviewProd"
        component={Page.AddReview}
      />
      <UserRoute
        exact
        path="/user/dashboard/reviews/reviews-list"
        component={Page.UserReviews}
      />
      <AdminRoute
        exact
        path="/admin/dashboard"
        component={Page.AdminDashboard}
      />
      <AdminRoute
        exact
        path="/admin/dashboard/manage-categories"
        component={Page.CategoryManagement}
      />
      <AdminRoute
        exact
        path="/admin/dashboard/manage-products"
        component={Page.ProductManagement}
      />
      <AdminRoute
        exact
        path="/admin/dashboard/manage-orders"
        component={Page.AdminOrdersManagement}
      />
      <Route exact path="/sign-in" component={Page.SignIn} />
      <Route exact path="/sign-up" component={Page.SignUp} />
      <Route
        exact
        path="/account-authentication/:token"
        component={Page.Authentication}
      />
      <Route exact path="/success" component={Page.SuccessPage} />
      <Route exact path="/error" component={Page.ErrorPage} />
      <Route
        exact
        path="/user/password/forgot-password"
        component={Page.ForgotPassword}
      />
      <Route
        exact
        path="/user/password/reset-password/:token"
        component={Page.ResetPassword}
      />
      <Route path="*" component={ErrorPage} />
    </Switch>
  );
};

export default Pages;
