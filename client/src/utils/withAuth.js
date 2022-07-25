/* eslint-disable no-lone-blocks */
/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { isAuth } from "./helper";
import AuthenticationNeeded from "../components/utils/AuthenticationNeeded";
import ErrorPage from "../components/utils/ErrorPage";

export default (role) => (Component) =>
  class withAuth extends React.Component {
    renderProtectedPage() {
      const user = isAuth();
      const userRole = user && user.role;
      const isAdmin = user && user.role === "admin";
      let isAuthorized;
      {
        isAdmin ? (isAuthorized = true) : (isAuthorized = false);
      }
      if (role) {
        if (userRole && userRole === role) {
          isAuthorized = true;
        }
      } else {
        isAuthorized = true;
      }
      if (!user) {
        return <AuthenticationNeeded />;
      } else if (!isAuthorized) {
        return <ErrorPage error="unAuthorized" />;
      } else {
        return <Component {...this.props} />;
      }
    }

    render() {
      return this.renderProtectedPage();
    }
  };
