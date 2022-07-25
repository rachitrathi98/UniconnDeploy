import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { isAuth } from "../../utils/helper";

export default function ProjectList(props) {
  const { project, user, student, teacher } = props;
  const lim = 200;
  // console.log(project.teacherId);
  let options = null;
  if (
    (project.createdBy === "teacher" &&
      project.teacherId.includes(isAuth()._id)) ||
    (project.createdBy === "student" &&
      project.studentId.includes(isAuth()._id))
  ) {
    options = (
      <Fragment>
        <button
          onClick={(e) => props.deleteHandler(e, project._id, props.history)}
          className="float-right btn btn-danger btn-sm mx-1"
        >
          <i className="far fa-trash-alt"></i>{" "}
        </button>
        <Link
          to={`/editproject/${project._id}`}
          className="float-right btn btn-primary btn-sm mx-1"
        >
          <i className="fa fa-pencil" style={{ color: "white" }}></i>{" "}
        </Link>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <div className="card mt-2 mb-4 list-border">
        <div className="row no-gutters">
          <div className="col-12">
            <div className="card-body text-left">
              <strong>
                <Link to={`/project_detail/${project._id}`}>
                  {project.name}
                </Link>
              </strong>
              {options}
              <p className="card-text">
                {project.field_of_interest.length > 0 &&
                  project.field_of_interest.map((field, key) => {
                    if (key === project.field_of_interest.length - 1)
                      return <small key={key}>{` ${field}`}</small>;

                    if (key < project.field_of_interest.length - 1)
                      return <small key={key}>{` ${field}, `}</small>;
                    return null;
                  })}
              </p>
              <p className="card-text">
                <strong>Mentored By:</strong>{" "}
                {project.teacherId && project.teacherId.length ? (
                  project.teacherId.map((id, key) => {
                    if (key === project.teacherId.length - 1) {
                      return (
                        <>
                          <Link key={id} to={`/teacher/${id}`}>
                            {teacher[id]}
                          </Link>
                        </>
                      );
                    }
                    if (key < project.teacherId.length - 1)
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
                ) : (
                  <Link key={user._id} to={`/teacher/${user._id}`}>
                    {user.name}
                  </Link>
                )}
              </p>
              <p className="card-text">
                <strong>Executed By:</strong>{" "}
                {project.studentId && project.studentId.length
                  ? project.studentId.map((id, key) => {
                      if (key === project.studentId.length - 1) {
                        return (
                          <>
                            <Link key={id} to={`/student/${id}`}>
                              {student[id]}
                            </Link>
                          </>
                        );
                      }
                      if (key < project.studentId.length - 1) {
                        return (
                          <>
                            <Link key={id} to={`/student/${id}`}>
                              {student[id]}
                            </Link>
                            , &nbsp;
                          </>
                        );
                      }
                      return null;
                    })
                  : "No Students Linked"}
              </p>
              <p className="card-text">
                <strong>Description:</strong>{" "}
                {project.description && project.description.length > lim
                  ? project.description.substr(0, lim) + "..."
                  : project.description}
                <br />
                <Link to={`/project_detail/${project._id}`}>Read More</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
