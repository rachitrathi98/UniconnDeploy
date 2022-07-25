import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Loading from "../utils/LoadingSign";
import { isAuth } from "../../utils/helper";
import { deleteProjectHandler } from "../../utils/utility";

const ProjectCard = (props) => {
  const fontStyles = { fontSize: "1rem" };
  const { project, user } = props;
  console.log(project,user)
  let render = <Loading />;
  if (project&&user) {
    render = (
      <div className="col-12 mt-2">
        <Link to={`/project_detail/${project._id}`}>
          <h4 style={{ color: "black" }}>{project.name}</h4>
        </Link>
        {isAuth() && user._id === isAuth()._id ? (
          <Fragment>
            <button
              onClick={(e) => {
                deleteProjectHandler(e, project._id, props.history);
              }}
              className="float-right btn btn-danger btn-sm mx-2"
            >
              <i className="far fa-trash-alt"></i>{" "}
            </button>
            <Link
              to={`/editproject/${project._id}`}
              className="float-right btn btn-primary btn-sm mx-2"
            >
              <i className="fas fa-pencil-alt" style={{ color: "white" }}></i>{" "}
            </Link>
          </Fragment>
        ) : null}
        
        {project.createdBy==="teacher" ? (
          <p className="profile__p">
            <Link to={`/teacher/${user._id}`}>{user.name}</Link>
          </p>
        ) :  <p className="profile__p">
        <Link to={`/student/${user._id}`}>{user.name}</Link>
      </p>}
        <p className="profile__p">{project.status}</p>
        <p className="profile__p  mt-1">
          {project.field_of_interest &&
            project.field_of_interest.map((field, key) => {
              if (key === project.field_of_interest.length - 1) {
                return (
                  <small style={fontStyles} key={key}>{` ${field} `}</small>
                );
              }
              if (key < project.field_of_interest.length - 1)
                return (
                  <small style={fontStyles} key={key}>{` ${field}, `}</small>
                );
              return null;
            })}
        </p>
        <hr />
      </div>
    );
  }
  return render;
};

export default ProjectCard;
