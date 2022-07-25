import React, { Fragment } from "react";
import image from "../../../assets/images/Rectangle.png";
import Footer from "../../../container/layout/Footer";
import { Link } from "react-router-dom";
import { isAuth } from "../../../utils/helper";
import ProjectCard from "../../project/ProjectCard";
import default_display from "../../../assets/images/default.png";
import { Links } from "../../utils/Links";
import ReadMore from "../../utils/ReadMore";
import Loading from "../../utils/LoadingSign";
import ActivityCard from "../../activity/ActivityCard";
import { initiateMessage } from "../../../utils/utility";

const StudentProfile = (props) => {
  const imgStyles = { borderRadius: "50%", height: "8rem", width: "8rem" };
  const h4Styles = { fontSize: "1.5rem", marginRight: "0.5rem" };
  const greyAreaStyles = {
    height: "30px",
    backgroundColor: "#f5f4f4",
  };
  const linkStyles = { fontSize: "1.5rem" };

  const student = props.data[0] ? props.data[0] : props.data;
  if (student) {
    const photo =
      student.photo === "default.png"
        ? default_display
        : process.env.NODE_ENV === "production"
        ? `${process.env.REACT_APP_BASE_URL}/api/auth/${student.photo}`
        : `http://localhost:${process.env.PORT}/api/auth/${student.photo}`;

    return (
      <Fragment>
        <div className="col-lg-6 profile">
          <div className="profile-img">
            {student.photo ? (
              <img
                src={photo}
                alt="profile"
                className="pfp"
                style={imgStyles}
              />
            ) : (
              <img src={image} alt="profile" className="pfp" />
            )}
            <div className="row bg-white mainTeacher">
              <div className="col-lg-6 mt-2">
                <span className="d-inline d-lg-none">
                  {isAuth() && isAuth()._id === student._id ? (
                    <span className="d-inline d-lg-none float-right">
                      <div className="dropdown">
                        <button
                          className="btn btn-primary btn-sm"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="fas fa-plus-circle">{}</i>
                        </button>
                        <div
                          className="dropdown-menu dropdown-menu-right"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <Link className="dropdown-item" to={`/editprofile`}>
                            Edit Profile
                          </Link>
                          <Link className="dropdown-item" to="/addproject">
                            Add Project
                          </Link>
                        </div>
                      </div>
                    </span>
                  ) : (
                    <span className="d-inline d-lg-none float-right">
                      <i className="fas fa-comments"></i>
                    </span>
                  )}
                </span>
                <h4
                  className="text-primary font-weight-bold mt-3"
                  style={h4Styles}
                >
                  {student.name}
                </h4>
                <ReadMore
                  className="read-more-content"
                  limit={200}
                  value={student.description}
                />
              </div>
              <div className="col-lg-6 mt-4 text-lg-center">
                <span className="d-none d-lg-block">
                  {isAuth() && isAuth()._id === student._id ? (
                    <span className="d-none d-lg-block">
                      <div className="dropdown">
                        <button
                          className="btn btn-primary btn-sm float-lg-right"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="fas fa-plus-circle"></i>
                        </button>
                        <div
                          className="dropdown-menu dropdown-menu-right"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <Link className="dropdown-item" to={`/editprofile`}>
                            Edit Profile
                          </Link>
                          {/* <Link className="dropdown-item" to="/addproject">
                            Add Projectf
                          </Link> */}
                          <Link className="dropdown-item" to="/addproject">
                            Add a Project
                          </Link>
                        </div>
                      </div>
                    </span>
                  ) : (
                    <span className="d-none d-lg-block float-right">
                      <i
                        style={linkStyles}
                        className="fas fa-comments chat-teacher"
                        onClick={() => {
                          initiateMessage(
                            {
                              _id: student._id,
                              role: student.role,
                              notificationId: student.notificationId,
                            },
                            props.history,
                          );
                        }}
                      ></i>
                    </span>
                  )}
                </span>
                <h4 className="text-primary font-weight-bold">
                  Contact Information
                </h4>
                <p className="profile__p">
                  <strong>Email: </strong> {student.emailId}
                </p>
                {student.contact && student.contact.phone_no ? (
                  <p className="profile__p">
                    <strong>Phone no: </strong> {student.contact.phone_no}
                  </p>
                ) : null}
                {student.contact && student.contact.email ? (
                  <p className="profile__p">
                    <strong>Email: </strong> {student.contact.email}
                  </p>
                ) : null}

                {<Links links={student.links} />}
              </div>
              <div className="col-12 mt-4 pb-3">
                {isAuth() && isAuth()._id === student._id ? (
                  <>
                    <Link
                      to="/addproject"
                      className="float-right btn btn-outline-primary"
                      style={{ width: "100%" }}
                    >
                      Add a Project / Idea
                    </Link>
                  </>
                ) : null}
              </div>
              <div className="col-12" style={greyAreaStyles}></div>

              <div className="col-12 mt-4 pb-3">
                <h4 className="text-primary font-weight-bold">
                  Educational Qualification
                </h4>
                <li>
                  <span className="profile__p">{student.branch}</span>
                  <span className="profile__p float-right">
                    {student.batch}
                  </span>
                </li>
                {student.collegeId ? (
                  <li className="profile__p">{student.collegeId.name}</li>
                ) : null}
                {student.university_id ? (
                  <p className="profile__p">
                    <li className="profile__p">UID: {student.university_id}</li>
                  </p>
                ) : null}
              </div>
              <div className="col-12" style={greyAreaStyles} />
              {student.field_of_interest ? (
                <>
                  <div className="col-12 mt-4 pb-3">
                    <h4 className="text-primary font-weight-bold">
                      Fields of Interest
                    </h4>
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        {student.field_of_interest
                          .slice(0, 4)
                          .map((field, key) => (
                            <li key={key} className="profile__p">
                              {field}
                            </li>
                          ))}
                      </div>
                      <div className="col-12 col-lg-6">
                        {student.field_of_interest
                          .slice(4, 8)
                          .map((field, key) => (
                            <li key={key} className="profile__p">
                              {field}
                            </li>
                          ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : null}

              {isAuth() ? (
                <Fragment>
                  <div className="col-12" style={greyAreaStyles}></div>
                  <div className="col-12 mt-4">
                    <Link
                      to={`/student_project/${student._id}`}
                      style={linkStyles}
                      className="text-primary font-weight-bold"
                    >
                      Projects
                    </Link>
                    {isAuth() && isAuth()._id === student._id && (
                      <span>
                        <Link
                          className="btn btn-primary float-right"
                          to="/addproject"
                        >
                          Add Project
                        </Link>
                      </span>
                    )}
                    <hr />
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <div className="col-12" style={greyAreaStyles}></div>
                  <div className="col-12 mt-4">
                    <span
                      style={linkStyles}
                      className="text-primary font-weight-bold"
                    >
                      Projects
                    </span>
                    <hr />
                  </div>
                </Fragment>
              )}
              {student.projectId && student.projectId.length > 0
                ? student.projectId.map((project, key) => {
                    return (
                      <ProjectCard
                        key={key}
                        project={project}
                        user={{ name: student.name, _id: student._id }}
                        history={props.history}
                      />
                    );
                  })
                : null}
              {student.activityId && student.activityId.length > 0 && (
                <Fragment>
                  <div className="col-12" style={greyAreaStyles}></div>
                  <div className="col-12 mt-4">
                    <span
                      style={linkStyles}
                      className="text-primary font-weight-bold"
                    >
                      Non-Academic Initiative
                    </span>
                    <hr />
                  </div>

                  {student.activityId.map((activity, key) => {
                    return (
                      <ActivityCard
                        key={key}
                        deleteActivityHandler={props.deleteActivityHandler}
                        activity={activity}
                        teacher={{ name: student.name, _id: null }}
                      />
                    );
                  })}
                </Fragment>
              )}
              <div className="col-12" style={greyAreaStyles}></div>
              <div className="col-12 d-none d-lg-block">
                <Footer />
              </div>
              <div className="col-12 d-lg-none">
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return <Loading />;
  }
};
export default StudentProfile;
