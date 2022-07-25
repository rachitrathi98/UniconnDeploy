import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { isAuth } from "../../utils/helper";
import brandImage from "../../assets/images/finImage.svg";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/auth";
import { Link as LinkScroll } from "react-scroll";

const Header = (props) => {
  const fontTwenty = { fontSize: "18px" };
  let Unreadcount = 0;
  if (props.notification)
    props.notification.map((check) =>
      check.ReadStatus ? Unreadcount : Unreadcount++
    );

  const isActive = (path) => {
    if (window && window.location.href.includes(path) && !props.slideDrawer) {
      return { fontSize: "18px", color: "#0186FE" };
    } else {
      return { fontSize: "18px" };
    }
  };

  return (
    <Fragment>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{
          boxShadow: "0px 10px 10px -15px",
        }}
      >
        <a
          className="navbar-brand d-block mx-auto mx-lg-0"
          alt="brand"
          href="/"
        >
          <img className="img-brand img-center" alt="brand" src={brandImage} />
          <small style={{ fontSize: "25px" }}>UniConn</small>
        </a>
        <button
          className="navbar-toggler ml-auto"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mr-lg-5 text-center">
            {!isAuth() && (
              <Fragment>
                <li className="nav-item my-1 my-lg-0 d-lg-none">
                  <Link className="nav-link" to="/" style={fontTwenty}>
                    <img
                      className="img-brand"
                      alt="brand"
                      src={brandImage}
                      style={{ fontSize: "5px" }}
                    />{" "}
                    UniConn
                  </Link>
                </li>
                <li className="nav-item my-1 my-lg-0">
                  <LinkScroll
                    to="team"
                    smooth={true}
                    duration={700}
                    className="nav-link"
                    style={fontTwenty}
                  >
                    Team
                  </LinkScroll>
                </li>
                <li className="nav-item my-1 my-lg-0">
                  <LinkScroll
                    to="contactUs"
                    smooth={true}
                    duration={700}
                    className="nav-link"
                    style={fontTwenty}
                  >
                    Contact Us
                  </LinkScroll>
                </li>
              </Fragment>
            )}
            {isAuth() && (
              <Fragment>
                <li
                  className="nav-item my-1 my-lg-0"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Link
                    className="nav-link"
                    to="/profile"
                    style={isActive("/profile")}
                  >
                    <i className="fas fa-user-circle fa-1x d-none d-lg-block"></i>
                    Profile
                  </Link>
                </li>
                <li
                  className="nav-item my-1 my-lg-0"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Link
                    className="nav-link mt-0"
                    to="/notifications"
                    style={isActive("/notification")}
                  >
                    <i
                      className="fas fa-bell d-none d-lg-block"
                      style={{ position: "relative" }}
                    >
                     { Unreadcount > 0 && <span
                        style={{
                          position: "absolute",
                          top: -13,
                          right: 30,
                          width: "15px",
                          borderRadius: "100%",
                          backgroundColor: "#0186FE",
                          color: "white",
                        }}
                      >
                        {Unreadcount}
                      </span>}
                    </i>
                    Notifications
                  </Link>
                </li>
                <li
                  className="nav-item my-1 my-lg-0"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Link
                    className="nav-link mt-0"
                    to="/yourposts"
                    style={isActive("/yourposts")}
                  >
                    <i className="fas fa-question-circle fa-1x d-none d-lg-block"></i>
                    Your Posts
                  </Link>
                </li>
                <li className="nav-item my-1 my-lg-0">
                  <Link
                    className="nav-link"
                    to={`/${isAuth().role}_project/${isAuth()._id}`}
                    style={isActive("project")}
                  >
                    <i className="fas fa-project-diagram fa-1x d-none d-lg-block"></i>
                    Projects
                  </Link>
                </li>

                <li
                  className="nav-item my-1 my-lg-0"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <button
                    style={{
                      fontSize: "18px",
                      color: "rgba(0,0,0,.5)",
                    }}
                    className="nav-item btn"
                    onClick={() => {
                      console.log("props header", props);
                      props.onLogout(() => {
                        props.props.history.push("/");
                      });
                    }}
                  >
                    <i className="fas fa-sign-out-alt fa-1x d-none d-lg-block"></i>
                    Sign Out
                  </button>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    onLogout: (next) => dispatch(actions.logout(next)),
    onAuth: () => dispatch(actions.auth()),
  };
};
export default connect(mapStateToProps, mapDispatchtoProps)(Header);
