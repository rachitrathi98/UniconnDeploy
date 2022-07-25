/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Footer from "../../container/layout/Footer";
import { isAuth } from "../../utils/helper";
import ProfileHeader from "../utils/profileHeader";
import default_display from "../../assets/images/default.png";
import Project from "../project/Project";

const ActivityDetails = (props) => {
  const data = props.data;
  const user = props.user;
  const photo =
    user.photo === "default.png"
      ? default_display
      : user.photo && process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL}/api/auth/${user.photo}`
      : user.photo
      ? `http://localhost:${process.env.PORT}/api/auth/${user.photo}`
      : null;

  return (
    <Fragment>
      <div className="col-lg-6">
        <div className="col-lg-12 profile">
          <div className="profile-img ">
            <img src={photo} alt="profile" className="pfp" />
            <div className="row bg-white mainTeacher">
              <ProfileHeader user={user} />
              <div className="col-12 list-border mt-5">
                <div className="card">
                  <div className="row no-gutters">
                    <div className="col-12">
                      <div className="card-body text-left">
                        {data.teacherId &&
                        isAuth()._id === data.teacherId[0] ? (
                          <Fragment>
                            <button
                              onClick={(e) => props.deleteHandler(e, data._id)}
                              className="float-right btn btn-danger btn-sm mx-1"
                            >
                              <i className="far fa-trash-alt"></i>{" "}
                            </button>
                            <Link
                              to={`/editactivity/${data._id}`}
                              className="float-right btn btn-primary btn-sm mx-1"
                            >
                              <i
                                className="fas fa-pencil-alt"
                                style={{ color: "white" }}
                              ></i>{" "}
                            </Link>
                          </Fragment>
                        ) : null}

                        <strong>
                          <p className="card-title">{data.name}</p>
                        </strong>
                        <p className="card-text">
                          <strong>Status:</strong> {data.status}
                        </p>
                        <p className="card-text">
                          <strong>Description:</strong> {data.description}
                        </p>

                        <p className="card-text">
                          <strong>Links:</strong>{" "}
                          {data.links && data.links.length > 0
                            ? data.links.map((link, key) => {
                                return ` ${link} `;
                              })
                            : null}
                        </p>
                        <p className="card-text">
                          <strong>More Description:</strong>{" "}
                          {data.more_description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={props.history.goBack}
                  className="btn btn-outline-primary btn-sm mt-2 d-none d-lg-block"
                >
                  Back
                </button>
              </div>
              <div className="col-12 d-none d-lg-block">
                <Footer />
              </div>
              <div className="col-12 mt-3 d-lg-none">
                {/* <h3>Projects you might be interested in</h3> */}
                <Project />
              </div>
              <div className="col-12 d-lg-none">
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-2 d-none d-lg-block projectList ml-3 pb-5 pt-3">
        {/* <h5>Projects you might be interested in</h5> */}
        <Project />
      </div>
    </Fragment>
  );
};

export default ActivityDetails;
