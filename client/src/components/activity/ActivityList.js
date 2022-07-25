import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { isAuth } from "../../utils/helper";

const ActivityList = (props) => {
  const activity = props.activity;
  let options = null;
  if (activity.teacherId.includes(isAuth()._id)) {
    options = (
      <Fragment>
        <button
          onClick={(e) => props.deleteHandler(e, activity._id, props.history)}
          className="float-right btn btn-danger btn-sm mx-1"
        >
          <i className="far fa-trash-alt"></i>{" "}
        </button>
        <Link
          to={`/editactivity/${activity._id}`}
          className="float-right btn btn-primary btn-sm mx-1"
        >
          <i className="fa fa-pencil" style={{ color: "white" }}></i>{" "}
        </Link>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <div className="card my-2 list-border">
        <div className="row no-gutters">
          <div className="col-12">
            <div className="card-body text-left">
              <strong>
                <Link to={`/activity_detail/${activity._id}`}>
                  {activity.name}
                </Link>
                {options}
              </strong>

              {activity.position && (
                <p className="profile__p">
                  <strong>Role:</strong> {activity.position}{" "}
                </p>
              )}

              {/* {teacher.name && <p className="profile__p">{teacher.name} </p>} */}

              {activity.collaborator && (
                <p className="profile__p">
                  {" "}
                  <strong>Collaborators:</strong> {activity.collaborator}{" "}
                </p>
              )}
              {activity.status && (
                <p className="profile__p">
                  {" "}
                  <strong>Status:</strong> {activity.status}{" "}
                </p>
              )}
              <p className="card-text">
                <strong>Description:</strong> {activity.description}
                <span className="ml-1">
                  <Link to={`/activity_detail/${activity._id}`}>
                    ... Read More
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ActivityList;
