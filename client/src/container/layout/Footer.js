import React, { Fragment } from "react";
import { isAuth } from "../../utils/helper";

const Footer = () => {
  const fontSize = { fontSize: "1.145rem" };
  let renderRight = (
    <Fragment>
      <button
        type="submit"
        onClick={() => {
          window.location.href = "https://forms.gle/wJ5gvv8BosxLrUiS8";
        }}
        className="btn btn-primary button-submit my-2"
      >
        <h4 style={fontSize} className="mt-2">
          Want to work with us?
        </h4>
        <p className="mt-3" style={fontSize}>
          Fill Out This Form!
        </p>
      </button>
      <button
        type="submit"
        onClick={() => {
          window.location.href = "https://forms.gle/y3e6xdQMCoTD6tai6";
        }}
        className="btn btn-primary button-submit my-2"
      >
        <h4 className="mt-2" style={fontSize}>
          Any suggestions? Have any issues?
        </h4>
        <p className="mt-2" style={fontSize}>
          Fill Out This Form!
        </p>
      </button>
    </Fragment>
  );
  let renderLeft = (
    <Fragment>
      <h4 className="d-none d-lg-block font-weight-bold mb-lg-3">Contact Us</h4>
      <p className="d-block d-lg-none font-weight-bold">Contact Us</p>

      <h4 style={fontSize} className="d-none d-lg-block">
        <i className="fas fa-envelope mr-3"></i> uniconn.in@gmail.com
      </h4>
      <p className="d-block d-lg-none">
        <i className="fas fa-envelope mr-3"></i> uniconn.in@gmail.com
      </p>

      <h4 style={fontSize} className="d-none d-lg-block">
        <i className="fas fa-phone-alt mr-3"></i> 9870033483 / 9819440163
      </h4>
      <p className="d-block d-lg-none">
        <i className="fas fa-phone-alt mr-3"></i> 9870033483 / 9819440163
      </p>
      <h4 className="d-none d-lg-block font-weight-bold mb-lg-3 mt-lg-4">
        Follow Us
      </h4>
      <p className="d-block d-lg-none font-weight-bold">Follow Us</p>
      <p>
        <a
          style={{ textDecoration: "none", color: "black" }}
          target="_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/company/uniconn-in/"
        >
          <i className="fab fa-linkedin fa-2x mx-1"></i>
        </a>
        <a
          style={{ textDecoration: "none", color: "black" }}
          target="_blank"
          rel="noreferrer"
          href="https://www.facebook.com/UniConnin-104085118538418"
        >
          <i className="fab fa-facebook fa-2x mx-1"></i>
        </a>
        <a
          style={{ textDecoration: "none", color: "black" }}
          target="_blank"
          rel="noreferrer"
          href="https://www.instagram.com/uniconn.in/"
        >
          <i className="fab fa-instagram fa-2x mx-1"></i>
        </a>
      </p>
    </Fragment>
  );
  if (isAuth()) {
    renderRight = (
      <Fragment>
        <button
          type="submit"
          onClick={() => {
            window.location.href = "https://forms.gle/wJ5gvv8BosxLrUiS8";
          }}
          className="btn btn-primary button-submit my-2"
        >
          <h4 style={fontSize} className="mt-2">
            Want to work with us?
          </h4>
          <p className="mt-3" style={fontSize}>
            Fill Out This Form!
          </p>
        </button>
        <button
          type="submit"
          onClick={() => {
            window.location.href = "https://forms.gle/y3e6xdQMCoTD6tai6";
          }}
          className="btn btn-primary button-submit my-2"
        >
          <h4 className="mt-2" style={fontSize}>
            Any suggestions? Have any issues?
          </h4>
          <p className="mt-2" style={fontSize}>
            Fill Out This Form!
          </p>
        </button>
      </Fragment>
    );
    renderLeft = (
      <Fragment>
        <h4 className="d-none d-lg-block font-weight-bold mb-lg-3">
          Contact Us
        </h4>
        <p className="d-block d-lg-none font-weight-bold">Contact Us</p>

        <h4 style={fontSize} className="d-none d-lg-block">
          <i className="fas fa-envelope mr-3"></i> uniconn.in@gmail.com
        </h4>
        <p className="d-block d-lg-none">
          <i className="fas fa-envelope mr-3"></i> uniconn.in@gmail.com
        </p>

        <h4 style={fontSize} className="d-none d-lg-block">
          <i className="fas fa-phone-alt mr-3"></i> 9870033483 / 9819440163
        </h4>
        <p className="d-block d-lg-none">
          <i className="fas fa-phone-alt mr-3"></i> 9870033483 / 9819440163
        </p>
        <h4 className="d-none d-lg-block font-weight-bold mb-lg-3 mt-lg-4">
          Follow Us
        </h4>
        <p className="d-block d-lg-none font-weight-bold">Follow Us</p>
        <p>
          <a
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none", color: "black" }}
            href="https://www.linkedin.com/company/uniconn-in/"
          >
            <i className="fab fa-linkedin fa-2x mx-1"></i>
          </a>
          <a
            style={{ textDecoration: "none", color: "black" }}
            target="_blank"
            rel="noreferrer"
            href="https://www.facebook.com/UniConnin-104085118538418"
          >
            <i className="fab fa-facebook fa-2x mx-1"></i>
          </a>
          <a
            style={{ textDecoration: "none", color: "black" }}
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/uniconn.in/"
          >
            <i className="fab fa-instagram fa-2x mx-1"></i>
          </a>
        </p>
      </Fragment>
    );
  }
  return (
    <div id="contactUs">
      <div
        className="jumbotron bg-white"
        style={{
          marginBottom: 0,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 text-lg-left text-center pt-lg-1">
              {renderLeft}
            </div>
            <div className="col-lg-6 text-center">{renderRight}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
