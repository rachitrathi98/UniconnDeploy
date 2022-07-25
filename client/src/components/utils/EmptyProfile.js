import React, { Fragment } from "react";
import Footer from "../../container/layout/Footer";
import { isAuth } from "../../utils/helper";
import Project from "../project/Project";

const EmptyProfile = (props) => {
  if (isAuth()) {
    let pageName;
    if (props.posts) {
      pageName = "Your Posts";
    } else if (props.projects) {
      pageName = "Projects";
    } else if (props.activity) {
      pageName = "Your Activity";
    } else {
      pageName = "Notifications";
    }
    return (
      <Fragment>
        <div className="col-lg-6">
          {/* <div className="col-lg-12"> */}
          {/* <div className="row bg-white mainTeacher"> */}
          <div
            className="my-4 home-forum col-lg-12"
            style={{
              lineHeight: "1rem",
              backgroundColor: "rgb(212, 218, 223)",
              margin: "auto",
            }}
          >
            <h4 className="text-center forum-h4">
              <strong>{pageName}</strong>
            </h4>
          </div>
          <div className="col-12 mt-4">
            <h5
              className="my-3"
              style={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "800",
                color: "#0084FF",
                fontSize: "30px",
              }}
            >
              No data found
            </h5>
          </div>
          <div className="col-12 d-none d-lg-block">
            <Footer />
          </div>
          <div className="col-12 my-5 py-3 d-lg-none projectList">
            <Project />
          </div>
          <div className="col-12 d-lg-none">
            <Footer />
          </div>
          {/* </div> */}
          {/* </div> */}
        </div>
      </Fragment>
    );
  } else {
    if (window) window.location.replace("/");
  }
};

export default EmptyProfile;
