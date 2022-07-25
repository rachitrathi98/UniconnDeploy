import React, { Fragment } from "react";
import image from "../../../assets/images/Rectangle.png";
import default_display from "../../../assets/images/default.png";
import ReadMore from "../../utils/ReadMore";
import Footer from "../../../container/layout/Footer";
import { Link } from "react-router-dom";
import { isAuth } from "../../../utils/helper";
import ProjectCard from "../../project/ProjectCard";
import { Links } from "../../utils/Links";
import ActivityCard from "../../activity/ActivityCard";
import { initiateMessage } from "../../../utils/utility";

const TeacherProfile = (props) => {
  const h4Styles = { fontSize: "1.5rem", marginRight: "0.5rem" };
  const greyAreaStyles = {
    height: "30px",
    backgroundColor: "#f5f4f4",
  };
  const linkStyles = { fontSize: "1.5rem" };

  const teacher = props.data[0] ? props.data[0] : props.data;
  if (teacher) {
    const photo =
      teacher.photo === "default.png"
        ? default_display
        : process.env.NODE_ENV === "production"
        ? `${process.env.REACT_APP_BASE_URL}/api/auth/${teacher.photo}`
        : `http://localhost:${process.env.PORT}/api/auth/${teacher.photo}`;

    return (
      <Fragment>
        <div className="mt-4 col-lg-6 profile">
          <div className="profile-img">
            {teacher.photo ? (
              <img src={photo} alt="profile" className="pfp" />
            ) : (
              <img src={image} alt="profile" className="pfp" />
            )}
            <div className="row bg-white mainTeacher">
              <div className="col-lg-6 mt-2">
                {isAuth() && isAuth()._id === teacher._id ? (
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
                        <Link className="dropdown-item" to="/addactivity">
                          Add New Non-Academic Initiative
                        </Link>
                      </div>
                    </div>
                  </span>
                ) : (
                  <span className="d-inline d-lg-none float-right">
                    <i className="fas fa-comments"></i>
                  </span>
                )}
                <h4
                  className="text-primary font-weight-bold mt-3"
                  style={h4Styles}
                >
                  {teacher.name}
                </h4>
                {teacher.position && teacher.department ? (
                  <p className="profile__p">
                    {teacher.position} at {teacher.department}
                  </p>
                ) : null}
                {teacher.collegeId ? (
                  <Fragment>
                    <p className="profile__p">{teacher.collegeId.name}</p>
                    <p className="profile__p">{teacher.collegeId.address}</p>
                  </Fragment>
                ) : null}
              </div>
              <div className="col-lg-6 mt-4 text-lg-center">
                {isAuth() && isAuth()._id === teacher._id ? (
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
                        <Link className="dropdown-item" to="/addproject">
                          Add Project
                        </Link>
                        <Link className="dropdown-item" to="/addactivity">
                          Add New Non-Academic Initiative
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
                            _id: teacher._id,
                            role: teacher.role,
                            notificationId: teacher.notificationId,
                          },
                          props.history,
                        );
                      }}
                    ></i>
                  </span>
                )}

                <h4 className="text-primary font-weight-bold">
                  Contact Information
                </h4>
                <p className="profile__p">
                  <strong>Email: </strong> {teacher.emailId}
                </p>

                {teacher.contact && teacher.contact.phone_no ? (
                  <p className="profile__p">
                    <strong>Phone no: </strong> {teacher.contact.phone_no}
                  </p>
                ) : null}

                {teacher.contact && teacher.contact.email ? (
                  <p className="profile__p">
                    <strong>Email: </strong> {teacher.contact.email}
                  </p>
                ) : null}

                {<Links links={teacher.links} />}
              </div>
              <div className="col-lg-6 mt-4">
                <h4 className="text-primary font-weight-bold">About Me</h4>
                <span>
                  <ReadMore
                    className="read-more-content"
                    limit={200}
                    value={teacher.description}
                  />
                </span>
              </div>
              <div className="col-lg-6 mt-4 text-lg-center">
                <h4 className="text-primary font-weight-bold">Reviews</h4>
                <p>COMING SOON</p>
              </div>
              {teacher.field_of_interest && (
                <div className="col-12" style={greyAreaStyles}></div>
              )}
              {teacher.field_of_interest ? (
                <>
                  <div className="col-12 mt-4 pb-3">
                    <h4 className="text-primary font-weight-bold">
                      Fields of Interest
                    </h4>
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        {teacher.field_of_interest
                          .slice(0, 4)
                          .map((field, key) => (
                            <li key={key} className="profile__p">
                              {field}
                            </li>
                          ))}
                      </div>
                      <div className="col-12 col-lg-6">
                        {teacher.field_of_interest
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
              {teacher.educational_qualification && (
                <div className="col-12" style={greyAreaStyles}></div>
              )}
              {teacher.educational_qualification &&
              teacher.educational_qualification.length > 0 ? (
                <div className="col-12 mt-4 pb-3">
                  <h4 className="text-primary font-weight-bold">
                    Educational Qualification
                  </h4>
                  {teacher.educational_qualification.map((field, key) => (
                    <li key={key} className="profile__p">
                      {field}
                    </li>
                  ))}
                </div>
              ) : null}
              {isAuth() ? (
                <Fragment>
                  <div className="col-12" style={greyAreaStyles}></div>
                  <div className="col-12 mt-4">
                    <Link
                      to={`/teacher_project/${teacher._id}`}
                      style={linkStyles}
                      className="text-primary font-weight-bold"
                    >
                      Projects
                    </Link>
                    {isAuth() && isAuth()._id === teacher._id && (
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

              {teacher.projectId &&
                teacher.projectId.map((project, key) => {
                  return (
                    <ProjectCard
                      key={key}
                      project={project}
                      user={{ name: teacher.name, _id: teacher._id }}
                      history={props.history}
                    />
                  );
                })}

              {isAuth() ? (
                <Fragment>
                  <div className="col-12" style={greyAreaStyles}></div>
                  <div className="col-12 mt-4">
                    <Link
                      to={`/activity/${teacher._id}`}
                      style={linkStyles}
                      className="text-primary font-weight-bold"
                    >
                      Non-Academic Initiatives
                    </Link>
                    {isAuth() && isAuth()._id === teacher._id && (
                      <span>
                        <Link
                          className="btn btn-primary float-right d-none d-lg-block"
                          to="/addactivity"
                        >
                          Add New Non-Academic Initiative
                        </Link>
                        <Link
                          className="btn btn-primary mt-1 d-block d-lg-none"
                          to="/addactivity"
                        >
                          Add New Non-Academic Initiative
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
                      Non-Academic Initiatives
                    </span>
                    <hr />
                  </div>
                </Fragment>
              )}

              {teacher.activityId &&
                teacher.activityId.map((activity, key) => {
                  return (
                    <ActivityCard
                      key={key}
                      deleteActivityHandler={props.deleteActivityHandler}
                      activity={activity}
                      teacher={{ name: teacher.name, _id: teacher._id }}
                    />
                  );
                })}
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
    return null;
  }
};
export default TeacherProfile;
