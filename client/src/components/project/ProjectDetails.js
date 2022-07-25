/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ReadMore from "../utils/ReadMore";
import Footer from "../../container/layout/Footer";
import { isAuth } from "../../utils/helper";
import ProfileHeader from "../utils/profileHeader";
import Project from "./Project";
import default_display from "../../assets/images/default.png";

const ProjectDetails = (props) => {
  console.log(props);
  const fontStyles = { fontSize: "1rem" };
  const data = props.data;
  const user = props.user;
  const student = props.student;
  const teacher = props.teacher;
  console.log("Student", props.data);
  const photo =
    user.photo === "default.png"
      ? default_display
      : user.photo && process.env.NODE_ENV === "production"
      ? `${process.env.REACT_APP_BASE_URL}/api/auth/${user.photo}`
      : user.photo
      ? `http://localhost:${process.env.PORT}/api/auth/${user.photo}`
      : null;
  let options = null;
  if (
    (isAuth() &&
      props.data.createdBy === "teacher" &&
      props.data.teacherId[0] === isAuth()._id) ||
    (props.data.createdBy === "student" &&
      props.data.studentId[0] === isAuth()._id)
  ) {
    options = (
      <Fragment>
        <button
          onClick={(e) => props.deleteHandler(e, data._id, props.history)}
          className="float-right btn btn-danger btn-sm mx-1"
        >
          <i className="far fa-trash-alt"></i>{" "}
        </button>
        <Link
          to={`/editproject/${data._id}`}
          className="float-right btn btn-primary btn-sm mx-1"
        >
          <i className="fa fa-pencil" style={{ color: "white" }}></i>{" "}
        </Link>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <div className="col-lg-6">
        <div className="col-lg-12 profile">
          <div className="profile-img ">
            <img src={photo} alt="profile" className="pfp" />
            <div className="row bg-white mainTeacher">
              <ProfileHeader user={props.user} />
              <div className="col-12 list-border mt-5">
                <div className="card">
                  <div className="row no-gutters">
                    <div className="col-12">
                      <div className="card-body text-left">
                        {options}
                        <strong>
                          <p className="card-title">{data.name}</p>
                        </strong>
                        <p className="card-text">
                          <strong>Status:</strong> {data.status}
                        </p>
                        <p className="card-text">
                          <strong>Field(s) of Project:</strong>{" "}
                          {data.field_of_interest &&
                            data.field_of_interest.map((field, key) => {
                              if (key === data.field_of_interest.length - 1) {
                                return (
                                  <small
                                    style={fontStyles}
                                    key={key}
                                  >{` ${field} `}</small>
                                );
                              }
                              if (key < data.field_of_interest.length - 1)
                                return (
                                  <small
                                    style={fontStyles}
                                    key={key}
                                  >{` ${field}, `}</small>
                                );
                              return null;
                            })}
                        </p>
                        <p className="card-text">
                          <strong>Mentored By:</strong>{" "}
                          {data.teacherId && data.teacherId.length > 0
                            ? data.teacherId.map((id, key) => {
                                if (key === data.teacherId.length - 1) {
                                  return (
                                    <>
                                      <Link key={id} to={`/teacher/${id}`}>
                                        {teacher[id]}
                                      </Link>
                                    </>
                                  );
                                } else if (key < data.teacherId.length - 1)
                                  return (
                                    <>
                                      <Link key={id} to={`/teacher/${id}`}>
                                        {teacher[id]}
                                      </Link>
                                      , &nbsp;
                                    </>
                                  );
                                return null;
                              })
                            : null}
                        </p>
                        <p className="card-text">
                          <strong>Executed By:</strong>{" "}
                          {data.studentId && data.studentId.length > 0
                            ? data.studentId.map((id, key) => {
                                if (key === data.studentId.length - 1) {
                                  return (
                                    <>
                                      <Link key={id} to={`/student/${id}`}>
                                        {student[id]}
                                      </Link>
                                    </>
                                  );
                                }
                                if (key < data.studentId.length - 1)
                                  return (
                                    <>
                                      <Link key={id} to={`/student/${id}`}>
                                        {student[id]}
                                      </Link>
                                      , &nbsp;
                                    </>
                                  );
                                return null;
                              })
                            : "No Students Linked"}
                        </p>
                        <p className="card-text">
                          <strong>Description:</strong>
                          <ReadMore
                            className="read-more-content"
                            limit={200}
                            value={data.description}
                          />
                        </p>
                        {data.publication && data.publication.length > 0 && (
                          <p className="card-text">
                            <strong>DOI / Citation:</strong>{" "}
                            {data.publication.map((field, key) => {
                              return ` ${field} `;
                            })}
                          </p>
                        )}
                        <p className="card-text">
                          <strong>Links:</strong>{" "}
                          {data.links && data.links.length > 0
                            ? data.links.map((link, key) => {
                                return (
                                  <li key={key}>
                                    <a
                                      href={link}
                                      rel="noreferrer"
                                      target="_blank"
                                    >
                                      {link}
                                    </a>
                                  </li>
                                );
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
        <Project />
      </div>
    </Fragment>
  );
};

export default ProjectDetails;
