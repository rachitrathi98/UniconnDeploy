import React from "react";
import { Link } from "react-router-dom";
import Header from "../../container/layout/Header";
import logo from "../../assets/logos/uniconn-color.svg";

// This is a fallback page which will be shown if the user redirects to an invalid URL.
const ErrorPage = (props) => {
  let message = "Page Not Available!";
  const error = props.match ? props.match.params.error : null;
  if (error === "college_Registration") {
    message =
      "This Email ID isnt from a college registered with us. Please use your college Email ID to login.";
  } else if (props.match && props.match.path === "/underdevelopment") {
    message = "Page under development ";
  } else if (props.error === "unAuthorized") {
    message =
      "You are not authorized. You dont have a permission to visit this page";
  }
  return (
    <div className="wrapper">
      <Header props={props} />
      <div className="error-container">
        <div id="errorCard" className="card text-center border-0">
          <div className="card-wrapper">
            <img id="errorImage" src={logo} alt="Logo of EniConn" />

            <div className="error-card-body">
              <h1 className="error-card-title">UniConn</h1>
              <p className="error-card-text"> {message} </p>
              <Link to="/" className="btn btn-outline-primary error-button">
                Back To Home Page?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
